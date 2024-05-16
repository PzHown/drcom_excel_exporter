import React, { useEffect } from 'react';
import gsap from 'gsap';

const Header: React.FC = () => {
    useEffect(()=>{
        gsap.fromTo(".gasp_header", {
            y: -100
        },{
            y: 0, 
            duration: 1.6,
            ease: "expo.out",
            delay: 0.2
        
        });
    }, []);

    return (
        <div className='gasp_header h-16 bg-white bg-op-30 backdrop-blur-3xl w-[100dvw] fixed flex items-center px-8 md:px-16 z-999 top-0 left-0'>
            <span className='color-black font-black'>DrCom表格转换器</span>
        </div>
    );
};


export default Header;