import imgImage1 from "./3c30194625108abdd8df9d234d7c928526fe2d32.png";
import imgImage7 from "./07e342b1a865c958e13031cffa2b07d041c7fef6.png";
import imgCamera from "./1affd0f32eaea7a47cbe532b60ef407ff3f11060.png";
import imgProfile from "./6fcf52e24563833a79e940f02266d01f1a935fc9.png";

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 7">
      <div className="absolute h-[1024px] left-0 top-0 w-[1820px]" data-name="image 1">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgImage1} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)" }} />
        </div>
      </div>
      <div className="absolute bg-[#f7f9fc] h-[894px] left-0 top-[130px] w-[1440px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[163px] justify-center leading-[0] left-1/2 not-italic text-[#505ba6] text-[128px] text-center top-[221.5px] w-[1316px]">
        <p className="leading-[130px]">Meus projetos</p>
      </div>
      <div className="absolute bg-white h-[286px] left-[62px] top-[325px] w-[508px]" />
      <div className="absolute bg-white h-[286px] left-[62px] top-[712px] w-[508px]" />
      <div className="absolute bg-white h-[286px] left-[870px] top-[325px] w-[508px]" />
      <div className="absolute bg-white h-[286px] left-[870px] top-[712px] w-[508px]" />
      <div className="absolute h-[75px] left-[41px] top-[32px] w-[549px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] left-[1330px] text-[30px] text-center text-white top-[73px] w-[84px]">
        <p className="leading-[120px]">Perfil</p>
      </div>
      <div className="absolute left-[271px] size-[90px] top-[432px]" data-name="Camera">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCamera} />
      </div>
      <div className="absolute left-[271px] size-[90px] top-[818px]" data-name="Camera">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCamera} />
      </div>
      <div className="absolute left-[1101px] size-[90px] top-[423px]" data-name="Camera">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCamera} />
      </div>
      <div className="absolute left-[1101px] size-[90px] top-[818px]" data-name="Camera">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCamera} />
      </div>
      <div className="absolute bg-[#878787] h-[289px] left-[1429px] rounded-[26px] top-[396px] w-[6px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[21px] justify-center leading-[0] left-[315.5px] text-[30px] text-black text-center top-[643.5px] w-[127px]">
        <p className="leading-[130px]">Projeto 1</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[21px] justify-center leading-[0] left-[1167px] text-[30px] text-black text-center top-[643.5px] w-[138px]">
        <p className="leading-[130px]">{`Projeto 2 `}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[21px] justify-center leading-[0] left-[1136px] text-[30px] text-black text-center top-[1021.5px] w-[138px]">
        <p className="leading-[130px]">{`Projeto 4 `}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[21px] justify-center leading-[0] left-[302px] text-[30px] text-black text-center top-[1020.5px] w-[138px]">
        <p className="leading-[130px]">{`Projeto 3 `}</p>
      </div>
      <div className="absolute h-[56px] left-[1219px] top-[42px] w-[72px]" data-name="Profile">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgProfile} />
      </div>
      <div className="absolute bg-[#7ed7ff] h-[55px] left-[1033px] rounded-[113px] top-[45px] w-[156px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[36px] justify-center leading-[0] left-[1110.5px] text-[#1f2937] text-[24px] text-center top-[72px] w-[149px]">
        <p className="leading-[20px]">Criar novo</p>
      </div>
    </div>
  );
}