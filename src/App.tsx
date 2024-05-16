import { useEffect, useState } from 'react'
import './App.css'
import Header from './layout/header'
import gsap from 'gsap'
import { textFormat } from './tools/textFormat'
import Table from './componets/table'
import { PersonInfo } from './po/person'

function App() {
  
  useEffect(()=>{
    //给.cardbox添加进入时动画
    gsap.fromTo('.cardbox', {
      y: 80,
      opacity: 0,
      scale: 0.6
    },{
      duration: 1,
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "expo.out",
      stagger: 0.2

    })
  }, []);

  const [text, setText] = useState("");

  function textHandleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function copyTable() {
    //复制表格，Table
    console.log(textFormat(text))
    const list: (string | number)[][] =[]
    textFormat(text).forEach((item)=>{
      if(typeof item === 'object'){
        const content = [item.jobNumber, item.password, 2, item.department,item.name,item.sex,item.idCard];
        list.push(content)
      }
    })
    //复制内容list到剪贴板
    const el = document.createElement('textarea');
    el.value = list.map((item)=>item.join('\t')).join('\n');
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  
  return (
    <>
      <Header />
      <div className='h-[100dvh] w-[100dvw] pt-16 bg-[var(--color-background)]'>
        <div className='cardbox grid grid-cols-1 gap-4 p-4 md:(px-24 py-16 gap-8)'>
          
          <Card>
            <div className='border border-[var(--color-primary)] bg-op-20 border-1 border-solid w-full min-h-16 h-full rounded-2'>
              <textarea value={text} onChange={textHandleChange} className='bg-[var(--color-primary)] rounded-2 bg-op-05 w-full h-full border-none resize-none text-center p-4 placeholder-[var(--color-primary-text)] text-op-30 text-[var(--color-primary-base)]' placeholder='在此粘贴文本'></textarea>
            </div>
          </Card>
          <Card>
            <p className='pb-6 text-center font-700'>预览结果</p>
            
          {(text !== "" && textFormat(text)[0]!=='格式有误') && (
            <Table data={textFormat(text)} />
          )}
          {(text !== "" && textFormat(text)[0]==='格式有误') && (
            <p>文本有误！</p>
          )}
          </Card>
        </div>

        <div className="fixed bottom-16 right-16 flex items-end before:(bg-white rounded-4 content-[''] w-full h-12 absolute -z-1 bottom-0 -left-6 shadow-md ) ">
          <div className='size-12 bg-[var(--color-secondary)] bg-op-10'>

          </div>
          
          <div className='text-3 size-16 bg-[var(--color-secondary)] rounded-4 flex justify-center items-center text-white cursor-pointer shadow-xl ml-4' onClick={()=>{copyTable()}}>
            复制
          </div>

        </div>

      </div>
    </>
  )
}




type CardProps = {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={'p-8 w-full bg-white rounded-4 '+ className}>
      {children}
    </div>
  )
}
export default App
