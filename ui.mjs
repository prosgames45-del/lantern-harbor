import{create,transition,weather,BUILDS,SCENARIOS,scenario,previewTide}from'./model.mjs';
let state=create();const el=id=>document.getElementById(id);
const labels={calm:'Calm water',storm:'Storm warning',tailwind:'Tailwind · +3 coins per unloading'};
function act(action){try{state=transition(state,action);render();el('notice').textContent=state.log[0];}catch(error){el('notice').textContent=error.message;}}
function render(){
 document.querySelector('.map').dataset.weather=weather(state.seed,state.tide);
 const settings=scenario(state.seed);el('scenario-label').textContent=`${settings.label} · seed ${state.seed}`;
 el('contract').textContent=`Finish the twelfth tide with ${settings.goalDeliveries} deliveries and ${settings.goalCoins} harbor coins. Keep an upkeep reserve and choose between protection, repairs and fuel.`;
 for(const k of ['coins','timber','fuel','reputation','integrity'])el(k).textContent=state[k];
 el('delivered').textContent=`${state.delivered} / ${settings.goalDeliveries}`;el('tide').textContent=`Tide ${state.tide} / 12`;
 el('weather').textContent=labels[weather(state.seed,state.tide)];el('forecast').textContent=state.tide<12?`Next tide: ${labels[weather(state.seed,state.tide+1)]}`:'Final tide';
 el('goal').textContent=`Deliveries ${Math.min(state.delivered,settings.goalDeliveries)} / ${settings.goalDeliveries} · Coins ${Math.min(state.coins,settings.goalCoins)} / ${settings.goalCoins}`;
 const next=previewTide(state);const signed=n=>n>=0?`+${n}`:`${n}`;
 el('consequences').textContent=next?`If you ring now: ${signed(next.coins)} coins · ${signed(next.fuel)} fuel · ${signed(next.timber)} timber · ${signed(next.integrity)} integrity · ${next.departures} departing vessel(s).${next.status==='lost'?' Warning: the voyage will end in failure.':next.status==='won'?' Both goals reached: this tide will finish in victory.':''}`:'Voyage finished. Choose a scenario and start another harbor.';
 el('bays').replaceChildren();state.bays.forEach((kind,index)=>{
  const b=document.createElement('button');b.className=`bay ${kind||'empty'}`;b.disabled=!!kind||state.status!=='playing';
  const title=document.createElement('span');title.textContent=kind?BUILDS[kind].label:`Bay ${index+1}`;b.append(title);
  const sub=document.createElement('small');sub.textContent=kind?(state.served.includes(index)?'Used this tide':'Ready'):'Tap to build';b.append(sub);
  b.setAttribute('aria-label',kind?`Bay ${index+1}: ${BUILDS[kind].label}`:`Build selected structure in bay ${index+1}`);
  b.onclick=()=>act({type:'build',kind:el('structure').value,bay:index});el('bays').append(b);
 });
 el('boats').replaceChildren();for(const boat of state.boats){const b=document.createElement('button');b.className='vessel';b.disabled=state.status!=='playing';
  const icon=document.createElement('span');icon.className='boat-icon';icon.textContent=boat.kind==='barge'?'▰':'◒';icon.setAttribute('aria-hidden','true');b.append(icon);
  b.append(document.createTextNode(boat.kind==='barge'?'Freight barge':'Fishing skiff'));
  const text=document.createElement('small');const fuel=boat.kind==='barge'?2:1;const reward=boat.kind==='barge'?14:8;text.textContent=`${reward} coins · ${fuel} fuel · leaves after tide ${boat.arrived+2}`;b.append(text);
  const instruction=document.createElement('small');instruction.textContent='Tap to unload at matching dock';b.append(instruction);b.onclick=()=>act({type:'serve',id:boat.id});el('boats').append(b);
 }
 if(!state.boats.length){const p=document.createElement('p');p.className='empty-channel';p.textContent='The channel is clear. Ring the bell for the next arrival.';el('boats').append(p);}
 el('log').replaceChildren();for(const line of state.log.slice(0,7)){const li=document.createElement('li');li.textContent=line;el('log').append(li);}
 for(const id of ['end-tide','buy-timber','buy-fuel','repair'])el(id).disabled=state.status!=='playing';
 if(state.status!=='playing'){el('notice').textContent=state.status==='won'?'Your harbor thrives! Both goals reached. Start a new harbor to try another plan.':'Season closed. Start a new harbor and try a different layout.';el('end-tide').textContent=state.status==='won'?'A thriving harbor · voyage complete':'Voyage complete · try a new harbor';}
 else el('end-tide').textContent='Ring the bell · next tide →';
}
el('end-tide').onclick=()=>act({type:'end_tide'});el('buy-timber').onclick=()=>act({type:'buy_timber'});el('buy-fuel').onclick=()=>act({type:'buy_fuel'});el('repair').onclick=()=>act({type:'repair'});el('restart').onclick=()=>act({type:'restart',seed:SCENARIOS[el('scenario').value].seed});
el('scenario').onchange=()=>{const choice=SCENARIOS[el('scenario').value];el('notice').textContent=`${choice.label} selected, seed ${choice.seed}. Press Start selected harbor to begin; your current voyage has not changed.`;};render();
