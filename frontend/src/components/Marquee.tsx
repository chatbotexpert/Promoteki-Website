import React from 'react';

const Marquee = ({ text = 'WE SAVE HUMAN HOURS —', dark = true }) => {
  const items = Array(10).fill(text);
  
  return (
    <div className={`b-top b-bottom py-3 overflow-hidden ${dark ? 'bg-black text-[#F4F4F0]' : 'bg-[#F4F4F0] text-black'}`}>
      <div className="marquee-wrapper">
        <div className="marquee-content text-sm md:text-base font-medium tracking-widest uppercase">
          {items.map((item, i) => (
            <span key={i} className="px-4">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
