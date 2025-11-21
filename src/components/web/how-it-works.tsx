import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Search, Bookmark, FileText } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search',
      description: 'Find grants that match your business using our powerful search and filtering tools.',
    },
    {
      icon: Bookmark,
      title: 'Save',
      description: 'Bookmark grants you are interested in and organize them in your personal dashboard.',
    },
    {
      icon: FileText,
      title: 'Apply',
      description: 'Track your application progress and get reminders for important deadlines.',
    },
  ]

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-[180px]  px-4 sm:px-6 lg:px-8">
      <div className=" container mx-auto">
        <div className="text-center mb-[60px]">
          <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-[#0C2661] mb-4">
            How Our Grants Search Works
          </h1>
          <p className="text-base text-[#424242] ">
            A simple three-step process to search, save, and apply for grants that help your business prosper.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, ) => {
            const Icon = step.icon
            return (
              <Card
                key={step.title}
                className="bg-[linear-gradient(90.93deg,#CCE5FF_3.19%,#D7E8FB_96.81%)] border-0 rounded-2xl  hover:scale-95 duration-300 ease-in-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.10)] "
                style={{ boxShadow: '0px 4px 4px 0px #00000014' }}
              >
                <CardHeader className="flex justify-center items-center">
                  <div className="w-[60px] h-[60px] rounded-full bg-[#B6D3FB] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#0C2661]" />
                  </div>
                </CardHeader>

                <CardContent className="text-center">
                  <h3 className="text-[18px] font-bold text-[#0C2661] mb-3">{step.title}</h3>
                  <p className="text-sm text-[#424242] font-normal">{step.description}</p>
                </CardContent>
              </Card>


            )
          })}
        </div>
      </div>
    </div>
  )
}
