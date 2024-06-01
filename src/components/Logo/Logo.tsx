interface LogoProps {
  src: string
}

export const Logo = ({ src }: LogoProps) => {
  return (
    <div className="w-4 h-4">
      <img src={src} alt="" className="w-full h-full" />
    </div>
  )
}