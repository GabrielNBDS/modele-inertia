import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { LuAtSign, LuFacebook, LuInstagram, LuLinkedin, LuPhone } from 'react-icons/lu'

export default function Contact() {
  return (
    <section id="contact" className="container mx-auto xl:max-w-5xl">
      <div className="my-6">
        <div className="grid sm:grid-cols-2 items-center gap-16 p-8 border">
          <div>
            <h1 className="text-3xl font-extrabold">Fale conosco</h1>
            <p className="text-sm text-muted-foreground mt-3">
              Have some big idea or brand to develop and need help? Then reach out we'd love to hear
              about your project and provide help.
            </p>
            <div className="mt-12">
              <ul className="mt-3 flex flex-col gap-4">
                <li className="flex items-center gap-2">
                  <LuAtSign className="text-primary h-6 w-6" />
                  <p>contact@domain.com</p>
                </li>
                <li className="flex items-center gap-2">
                  <LuPhone className="text-primary h-6 w-6" />
                  <p>(000) 0000-000</p>
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <ul className="flex space-x-4">
                <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a>
                    <LuFacebook className="text-primary h-6 w-6" />
                  </a>
                </li>
                <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a>
                    <LuLinkedin className="text-primary h-6 w-6" />
                  </a>
                </li>
                <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a>
                    <LuInstagram className="text-primary h-6 w-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form className="ml-auo space-y-4">
            <Input placeholder="E-mail" type="email" required />
            <Textarea
              required
              placeholder="Mensagem"
              rows={6}
              className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
            ></Textarea>
            <Button className="w-full">Enviar</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
