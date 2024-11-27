/* eslint-disable react/no-unknown-property */
import paperWind from '../../public/creative_craft_paper_origami_windmill_icon.svg';
import githubImg from '../../public/github.png'
export default function Navbar() {
  return (
    <header className="text-gray-600 body-font fixed top-0 bg-white z-50 w-full shadow-sm">
    <div className="container mx-auto flex  p-5 flex-row items-center justify-between">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        
         <img src={paperWind} />
        <span className="ml-3 text-xl">PERF <br/>Load</span>
      </a>
  
      <div className="flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-base md:mt-0">
        <div >
        <a href='https://github.com/Akashssss' target='_blank'>
         <img src={githubImg} alt="" className='w-6 h-6 m-2' />
         
        </a>
     
        </div>
        <span className='text-2xl'>👋</span>
      </div>
    </div>
  </header>
  )
}
