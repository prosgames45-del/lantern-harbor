/** Pure simulation. All coins are fictional; no network, payments or storage. */
export const BUILDS = Object.freeze({quay:{coins:7,timber:3,label:'Skiff quay'},
  freight:{coins:10,timber:4,label:'Freight dock'},breakwater:{coins:6,timber:3,label:'Breakwater'}});
export const INITIAL = Object.freeze({coins:20,timber:8,fuel:3});
export const SCENARIOS=Object.freeze({calm:{label:'Calm coast',seed:11,stormChance:.12,goalCoins:100,goalDeliveries:9},balanced:{label:'Working harbor',seed:27,stormChance:.3,goalCoins:90,goalDeliveries:10},storm:{label:'Storm season',seed:91,stormChance:.6,goalCoins:85,goalDeliveries:10}});
export function scenario(seed){return Object.values(SCENARIOS).find(s=>s.seed===seed)||SCENARIOS.balanced;}
export function random(seed,tide,salt=0){let x=(seed^Math.imul(tide,0x9e3779b1)^Math.imul(salt+1,0x85ebca6b))>>>0;x=Math.imul(x^(x>>>16),0x85ebca6b);x=Math.imul(x^(x>>>13),0xc2b2ae35);return ((x^(x>>>16))>>>0)/4294967296;}
export function weather(seed,tide){const r=random(seed,tide,3);return r<scenario(seed).stormChance?'storm':r>.78?'tailwind':'calm';}
function arrival(s){const kind=random(s.seed,s.tide)>.5?'barge':'skiff';s.boats.push({id:`boat-${s.tide}`,kind,arrived:s.tide});}
export function create(seed=27){const s={seed:seed>>>0,tide:1,...INITIAL,externalCost:0,bays:[null,null,null],boats:[],served:[],delivered:0,reputation:6,integrity:6,status:'playing',ledger:[],log:['Welcome, keeper. Build a quay before the first tide.']};arrival(s);return s;}
function change(s,reason,delta){for(const key of Object.keys(INITIAL)){const d=delta[key]||0;s[key]+=d;}s.ledger.push({tide:s.tide,reason,...delta});}
function afford(s,price){for(const k of Object.keys(INITIAL)){if(s[k]<(price[k]||0))throw Error(`Not enough ${k}.`);}}
export function transition(state,action){
  if(!action||typeof action.type!=='string')throw Error('Choose a valid action.');
  if(action.type==='restart')return create(action.seed??state.seed);
  if(state.status!=='playing')throw Error('This voyage has ended. Start a new harbor.');
  const s=structuredClone(state);
  if(action.type==='build'){
    const price=Object.hasOwn(BUILDS,action.kind)?BUILDS[action.kind]:null;if(!price||!Number.isInteger(action.bay)||action.bay<0||action.bay>2)throw Error('Choose a valid bay and structure.');
    if(s.bays[action.bay])throw Error('That bay is already occupied.');afford(s,price);
    change(s,`Build ${action.kind}`,{coins:-price.coins,timber:-price.timber});s.bays[action.bay]=action.kind;
    s.log.unshift(`Built ${price.label} in bay ${action.bay+1}.`);
  }else if(action.type==='serve'){
    const boat=s.boats.find(b=>b.id===action.id);if(!boat)throw Error('That vessel is no longer waiting.');
    const dock=boat.kind==='barge'?'freight':'quay';
    const bay=s.bays.findIndex((k,i)=>k===dock&&!s.served.includes(i));if(bay<0)throw Error('No matching unused dock this tide.');
    const fuel=boat.kind==='barge'?2:1;afford(s,{fuel});
    const coins=(boat.kind==='barge'?14:8)+(weather(s.seed,s.tide)==='tailwind'?3:0);
    change(s,`Unload ${boat.kind}`,{coins,fuel:-fuel});s.served.push(bay);s.delivered++;s.boats=s.boats.filter(b=>b.id!==boat.id);
    s.log.unshift(`Unloaded ${boat.kind}: +${coins} harbor coins, −${fuel} fuel.`);
  }else if(action.type==='buy_timber'){
    afford(s,{coins:3});change(s,'Trade for timber',{coins:-3,timber:2});s.log.unshift('Traded 3 coins for 2 timber.');
  }else if(action.type==='buy_fuel'){
    afford(s,{coins:4});if(s.fuel>=10)throw Error('Fuel store is full.');change(s,'Buy fuel',{coins:-4,fuel:Math.min(3,10-s.fuel)});s.log.unshift('Bought fuel for 4 harbor coins.');
  }else if(action.type==='repair'){
    if(s.integrity>=6)throw Error('Harbor is already sound.');afford(s,{timber:2});change(s,'Repair harbor',{timber:-2});s.integrity=Math.min(6,s.integrity+2);s.log.unshift('Repaired harbor using 2 timber.');
  }else if(action.type==='end_tide'){
    const insolvent=s.coins<2;change(s,'Harbor upkeep',{coins:-Math.min(2,s.coins)});
    if(weather(s.seed,s.tide)==='storm'&&!s.bays.includes('breakwater')){
      change(s,'Storm damage',{timber:-Math.min(2,s.timber)});s.integrity--;s.log.unshift('Storm: integrity −1 and up to 2 timber lost. A breakwater protects you.');
    }
    const lost=s.boats.filter(b=>s.tide-b.arrived>=2);s.reputation-=lost.length;s.boats=s.boats.filter(b=>!lost.includes(b));
    if(lost.length)s.log.unshift(`${lost.length} vessel(s) left; reputation −${lost.length}.`);
    const replenishment=weather(s.seed,s.tide)==='storm'?0:2;
    change(s,'Tide fuel delivery',{fuel:Math.min(replenishment,10-s.fuel)});
    if(s.integrity<=0||s.reputation<=0||insolvent){s.status='lost';s.log.unshift(insolvent?'Cannot pay 2-coin upkeep: the harbor closed.':'The harbor closed. Try a different plan.');}
    else if(s.tide===12){const goal=scenario(s.seed);s.status=s.delivered>=goal.goalDeliveries&&s.coins>=goal.goalCoins?'won':'lost';s.log.unshift(s.status==='won'?'Lantern Harbor thrives. You met both goals!':`Season ended. You needed ${goal.goalDeliveries} deliveries and ${goal.goalCoins} coins.`);}
    else{s.tide++;s.served=[];arrival(s);s.log.unshift(`Tide ${s.tide}: a ${s.boats.at(-1).kind} arrives.`);}
  }else throw Error('Unknown action.');
  s.log=s.log.slice(0,30);return s;
}
export function previewTide(state){if(state.status!=='playing')return null;const next=transition(state,{type:'end_tide'});return{coins:next.coins-state.coins,timber:next.timber-state.timber,fuel:next.fuel-state.fuel,integrity:next.integrity-state.integrity,reputation:next.reputation-state.reputation,departures:state.boats.filter(b=>state.tide-b.arrived>=2).length,status:next.status,nextTide:next.tide};}
