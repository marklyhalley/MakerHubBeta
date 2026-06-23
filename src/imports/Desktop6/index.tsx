import imgImage1 from "./3c30194625108abdd8df9d234d7c928526fe2d32.png";
import imgImage7 from "./07e342b1a865c958e13031cffa2b07d041c7fef6.png";
import imgUser from "./e1ddd664f211195766bd04c35c434b1b3ec4b12b.png";
import imgBookmark from "./a30340702b649b736d08a8f25210e66c6e859d92.png";
import imgGoBack from "./4f07a02ce2a19e2bf87e6260e45275403793258b.png";

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 6">
      <div className="absolute h-[1024px] left-0 top-0 w-[1820px]" data-name="image 1">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgImage1} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)" }} />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] left-[1363px] text-[25px] text-center text-white top-[70px] w-[128px]">
        <p className="leading-[120px]">Publicar</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] left-[1221.5px] text-[24px] text-center text-white top-[70.5px] w-[89px]">
        <p className="leading-[20px]">Salvar</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[36px] justify-center leading-[0] left-[1084px] text-[24px] text-center text-white top-[68px] w-[98px]">
        <p className="leading-[20px] mb-0">Meus</p>
        <p className="leading-[20px]">projetos</p>
      </div>
      <div className="absolute bg-[#7ed7ff] h-[55px] left-[795px] rounded-[113px] top-[43px] w-[156px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[36px] justify-center leading-[0] left-[872.5px] text-[#1f2937] text-[24px] text-center top-[70px] w-[149px]">
        <p className="leading-[20px]">Criar novo</p>
      </div>
      <div className="absolute bg-[#f7f9fc] h-[894px] left-0 top-[130px] w-[1440px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[212px] justify-center leading-[0] left-[calc(50%+9px)] not-italic text-[#1f2937] text-[128px] text-center top-[582px] w-[1316px]">
        <p className="leading-[130px] whitespace-pre-wrap">{`Boa sorte galera do  T.I`}</p>
      </div>
      <div className="absolute h-[75px] left-[38px] top-[33px] w-[549px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[107px] justify-center leading-[0] left-1/2 not-italic text-[#505ba6] text-[128px] text-center top-[226.5px] w-[1316px]">
        <p className="leading-[130px]">Resultado:</p>
      </div>
      <div className="absolute h-[36px] left-[990px] top-[51px] w-[45px]" data-name="User">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgUser} />
      </div>
      <div className="absolute h-[29px] left-[1154px] top-[56px] w-[35px]" data-name="Bookmark">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBookmark} />
      </div>
      <div className="absolute flex h-[24.992px] items-center justify-center left-[1278px] top-[58px] w-[33.982px]">
        <div className="flex-none rotate-90">
          <div className="h-[33.982px] relative w-[24.992px]" data-name="Go Back">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgGoBack} />
          </div>
        </div>
      </div>
    </div>
  );
}