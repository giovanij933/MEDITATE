'use strict';
// MIND's technique guide: for each built-in technique, a picture and how to do it. Breathwork shows the shape of one
// breath (lung volume over time, from the technique's pacer pattern in index.html); every other technique shows a body
// lit where your attention rests. A technique you name yourself has no guide.
//
// The body outline is from react-body-highlighter (github.com/GV79/react-body-highlighter), used under its licence:
/*
MIT License

Copyright (c) 2020 GV79

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
window.TQG=(()=>{
  // the front of the body: [region, polygons] on a 100 × 220 grid
  const BODY=[["chest",["51.8 41.6 51 55.1 58 58 67.8 55.5 70.6 47.3 62 41.6","29.8 46.5 31.4 55.5 40.8 58 48.2 55.1 47.8 42 37.6 42"]],["obliques",["68.6 63.3 67.3 57.1 58.8 59.6 60 64.1 60.4 83.3 65.7 78.8 66.5 69.8","33.9 78.4 33.1 71.8 31 63.3 32.2 57.1 40.8 59.2 39.2 63.3 39.2 83.7"]],["abs",["56.3 59.2 58 64.1 58.4 78 58.4 92.7 56.3 98.4 55.1 104.1 51.4 107.8 51 84.5 50.6 67.3 51 57.1","43.7 58.8 48.6 57.1 49 67.3 48.6 84.5 48.2 107.3 44.5 103.7 40.8 91.4 40.8 78.4 41.2 64.5"]],["biceps",["16.7 68.2 18 71.4 22.9 66.1 29 53.9 27.8 49.4 20.4 55.9","71.4 49.4 70.2 54.7 76.3 66.1 81.6 71.8 82.9 69 78.8 55.5"]],["triceps",["69.4 55.5 69.4 61.6 75.9 72.7 77.6 70.2 75.5 67.3","22.4 69.4 29.8 55.5 29.8 60.8 22.9 73.1"]],["neck",["55.5 23.7 50.6 33.5 50.6 39.2 61.6 40 70.6 44.9 69.4 36.7 63.3 35.1 58.4 30.6","29 44.9 30.2 37.1 36.3 35.1 41.2 30.2 44.5 24.5 49 33.9 48.6 39.2 38 39.6"]],["front-deltoids",["78.4 53.1 79.6 47.8 79.2 41.2 75.9 38 71 36.3 72.2 42.9 71.4 47.3","28.2 47.3 21.2 53.1 20 47.8 20.4 40.8 24.5 37.1 28.6 37.1 26.9 43.3"]],["head",["42.4 2.9 40 11.8 42 19.6 46.1 23.3 49.8 25.3 54.7 22.4 57.6 19.2 59.2 10.2 57.1 2.4 49.8 0"]],["abductors",["52.7 110.2 54.3 124.9 60 110.2 62 100 64.9 94.3 60 92.7 56.7 104.5","47.8 110.6 44.9 125.3 42 115.9 40.4 113.1 39.6 107.3 38 102.4 34.7 93.9 39.6 92.2 41.6 99.2 43.7 105.3"]],["quadriceps",["34.7 98.8 37.1 108.2 37.1 127.8 34.3 137.1 31 132.7 29.4 120 28.2 111.4 29.4 100.8 32.2 94.7","63.3 105.7 64.5 100 66.9 94.7 70.2 101.2 71 111.8 68.2 133.1 65.3 137.6 62.4 128.6 62 111.4","38.8 129.4 38.4 112.2 41.2 118.4 44.5 129.4 42.9 135.1 40 146.1 36.3 146.5 35.5 140","59.6 145.7 55.5 129 60.8 113.9 61.2 130.2 64.1 139.6 62.9 146.5","32.7 138.4 26.5 145.7 25.7 136.7 25.7 127.3 26.9 114.3 29.4 133.5","71.8 113.1 73.9 124.1 73.9 140.4 72.7 145.7 66.5 138.4 70.2 133.5"]],["knees",["33.9 140 34.7 143.3 35.5 147.3 36.3 151 35.1 156.7 29.8 156.7 27.3 152.7 27.3 147.3 30.2 144.1","65.7 140 72.2 147.8 72.2 152.2 69.8 157.1 64.9 156.7 62.9 151"]],["calves",["71.4 160.4 73.5 153.5 76.7 161.2 79.6 167.8 78.4 187.8 79.6 195.5 74.7 195.5","24.9 194.7 27.8 164.9 28.2 160.4 26.1 154.3 24.9 157.6 22.4 161.6 20.8 167.8 22 188.2 20.8 195.5","72.7 195.1 69.8 159.2 65.3 158.4 64.1 162.4 64.1 165.3 65.7 177.1","35.5 158.4 35.9 162.4 35.9 166.9 35.1 172.2 35.1 176.7 32.2 182 30.6 187.3 26.9 194.7 27.3 187.8 28.2 180.4 28.6 175.5 29 169.8 29.8 164.1 30.2 158.8"]],["forearm",["6.1 88.6 10.2 75.1 14.7 70.2 16.3 74.3 19.2 73.5 4.5 97.6 0 100","84.5 69.8 83.3 73.5 80 73.1 95.1 98.4 100 100.4 93.5 89.4 89.8 76.3","77.6 72.2 77.6 77.6 80.4 84.1 85.3 89.8 92.2 101.2 94.7 99.6","6.9 101.2 13.5 90.6 18.8 84.1 21.6 77.1 21.2 71.8 4.9 98.8"]]];
  const ALL=BODY.map(([r])=>r).filter(r=>r!=='knees');
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
  // name: {p: regions lit solid, s: regions lit light, at: where attention rests, how, good: what it is good for, order}
  // breathwork: {how, good}; the pattern and pace come from the pacer the app passes in
  const G={
    'Breath counting':{p:['abs'],s:['chest'],at:'The belly, rising and falling.',how:'Count each out-breath from 1 to 10, then start again at 1. Lost count? Go back to 1 without judging.',good:'Building steady attention. A good first practice.'},
    'Open awareness':{p:[],s:ALL,at:'Everything at once: sounds, the body, thoughts.',how:"Let things come and go without following any of them. When you notice you're caught up in one, widen back out.",good:'Easing a busy mind without fighting it.'},
    'Noting':{p:['head'],s:['abs'],at:'Whatever pulls you away, then back to the breath.',how:'Give each distraction a soft one-word label (thinking, hearing, itching), then come back to the breath.',good:'Seeing what keeps grabbing your attention.'},
    'Box 4-4-4-4':{how:'In through the nose for 4, hold softly for 4, out for 4, hold for 4. If a hold strains, shorten all four sides.',good:'Steadying yourself before something demanding.'},
    'Resonance 5.5':{how:'Slow, smooth breaths in and out through the nose, with no pause at the top or the bottom.',good:'Settling down: about 5.5 breaths a minute is a pace many people find calming.'},
    'Physiological sigh':{how:'A full breath in through the nose, a short second sniff to top up, then a long, slow breath out through the mouth.',good:'A quick reset when you feel wound up: 1 to 3 rounds is often enough.'},
    '4-7-8':{how:'In through the nose for 4, hold for 7, then out through pursed lips for 8. Start with 4 rounds.',good:'Winding down, especially before sleep.'},
    'NSDR':{p:ALL,s:[],at:'The whole body, lying down.',how:'Lie on your back and follow the slow scan, each breath out longer than the breath in. Let the body go heavy without falling asleep.',good:'Rest in 10 to 20 minutes, say after a short night.'},
    'Progressive relaxation':{p:ALL,s:[],at:'One muscle group at a time.',how:'Tense a group for about 5 seconds, then let go for 10 to 15 and feel the difference. Work from the feet up to the face.',good:"Letting go of tension you didn't know you were holding."},
    'Head to toe':{p:['head'],s:ALL.filter(r=>r!=='head'),at:'One part of the body at a time, from the crown down.',how:"Rest on each part for a few breaths. Notice what's there (warmth, tension, nothing at all), soften it, and move on.",good:'Arriving in the body when the day has been all head.',
      order:'Crown, face and jaw, neck and shoulders, arms and hands, chest, belly, hips, thighs, calves, feet, then the whole body.'},
    'Session rehearsal':{p:['head'],s:[],at:'Your next session, seen from the inside.',how:'Picture it in the first person from start to finish, at real speed: the setting, your first moves, one hard moment and how you handle it.',good:'Walking in already knowing the plan.'},
    'Process':{p:['head'],s:[],at:'The steps, not the result.',how:'Picture each action done well, in order, the way it would really feel.',good:"Practising the how when the outcome isn't in your hands."},
    'Outcome':{p:['head'],s:[],at:'The finished result.',how:"Picture the result in detail, then the obstacle most likely to get in the way, and what you'll do when it does.",good:'Motivation with a plan attached.'},
    'Single-point':{p:['head'],s:[],at:'One spot, your eyes resting on it.',how:'Rest your gaze on a single point. Each time the eyes or the mind wander, bring them back.',good:'Attention you can point where you want it.'},
    'Counting':{p:['head'],s:['abs'],at:'A slow count.',how:'Count slowly, one number to each breath. Lose the count? Start again from 1.',good:'A busy mind that needs something simple to hold.'},
    'Candle':{p:['head'],s:[],at:'A flame, at arm’s length.',how:'Gaze softly at the flame for a minute, then close your eyes and hold the after-image until it fades. Repeat.',good:'Steadying the eyes and the mind together.'},
    'Evening review':{p:['forearm'],s:['head'],at:'The day just gone.',how:"Write what went well, what didn't, and one thing to do differently tomorrow.",good:"Closing the day so it doesn't follow you to bed."},
    'Morning pages':{p:['forearm'],s:['head'],at:'Whatever is on your mind.',how:'First thing, write about three pages by hand without stopping, editing or rereading.',good:'Clearing the clutter before the day starts.'},
    'Gratitude':{p:['forearm'],s:['head'],at:'What went right.',how:"Write three specific things you're grateful for today, and why each one happened.",good:"Noticing what's working."},
    'Free write':{p:['forearm'],s:['head'],at:'Anything at all.',how:"Keep the pen moving until the bell. Don't fix spelling, don't reread.",good:'Getting unstuck.'}
  };
  const get=n=>G[n]||null;
  // the body, lit
  const fig=g=>`<svg class="tq-fig" viewBox="0 0 100 220" aria-hidden="true">${BODY.map(([r,ps])=>{
    const c=g.p.includes(r)?'tq-p':g.s.includes(r)?'tq-s':r==='head'||r==='knees'?'tq-n':'';
    return ps.map(pt=>`<polygon${c?` class="${c}"`:''} points="${pt}"/>`).join('')}).join('')}</svg>`;
  // one breath: lung volume over time. In fills, a hold stays level, out empties; a top-up finishes a fill that stopped
  // short. P: the pacer's [cue, seconds] list
  const NAME={INHALE:'In',HOLD:'Hold',EXHALE:'Out','TOP UP':'Top up'};
  const curve=(P,big)=>{
    const T=P.reduce((a,[,s])=>a+s,0),w=big?320:52,h=big?132:26,pad=big?6:2,H=big?h-32:h,X=t=>pad+(w-2*pad)*t/T,Y=v=>pad+(H-2*pad)*(1-v);
    let t=0,v=0,d=`M${X(0)} ${Y(0)}`,seps='',labs='';
    P.forEach(([cue,s],i)=>{const to=cue==='INHALE'?(P[i+1]?.[0]==='TOP UP'?.72:1):cue==='TOP UP'?1:cue==='EXHALE'?0:v,v0=v;
      for(let k=1;k<=24;k++){const f=k/24,e=(1-Math.cos(Math.PI*f))/2;d+=`L${X(t+s*f).toFixed(1)} ${Y(v0+(to-v0)*e).toFixed(1)}`}
      if(big)labs+=`<text x="${X(t+s/2).toFixed(1)}" y="${H+15}" class="tq-cl">${NAME[cue]||cue}</text><text x="${X(t+s/2).toFixed(1)}" y="${H+29}" class="tq-cn">${s} s</text>`;
      t+=s;v=to;if(big&&t<T)seps+=`<line x1="${X(t).toFixed(1)}" x2="${X(t).toFixed(1)}" y1="${pad}" y2="${H}" class="tq-sep"/>`});
    return `<svg class="tq-cv" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${seps}<path d="${d}L${X(T)} ${Y(0)}Z" class="tq-a"/><path d="${d}" class="tq-l"/>${labs}</svg>`;
  };
  const pattern=P=>P.map(([c,s],i)=>`${i?(NAME[c]||c).toLowerCase():NAME[c]||c} ${s}`).join(' · ');
  const pace=P=>{const T=P.reduce((a,[,s])=>a+s,0),n=Math.round(60/T*2)/2;return `${T} s a breath, about ${n} a minute`};
  // in a list, beside the technique's name. P: the pacer, for breathwork
  const mini=(name,P)=>{const g=get(name);if(!g)return '';return `<span class="tq-mini" aria-hidden="true">${P&&!g.at?curve(P):fig(g)}</span>`};
  // the guide: the picture, then what to do
  const html=(name,P)=>{
    const g=get(name);if(!g)return '';const br=P&&!g.at,row=(t,d)=>`<dt>${t}</dt><dd>${esc(d)}</dd>`;
    return `<div class="tq"><div class="tq-pic">${br?curve(P,true):fig(g)}</div><dl class="tq-l">${br?row('Pattern',pattern(P))+row('Pace',pace(P)):row('Attention',g.at)}${
      g.order?row('Order',g.order):''}${row('How',g.how)}${row('Good for',g.good)}</dl></div>`;
  };
  return {get,mini,html,size:Object.keys(G).length};
})();
