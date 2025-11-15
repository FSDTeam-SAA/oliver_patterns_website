import { Card, CardContent,  CardHeader,  } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, FileText, Bookmark, BarChart3 } from 'lucide-react'

export function Services() {
  const services = [
    {
      icon: Search,
      title: 'Smart Grant Search',
      description:
        'Find relevant grants with our powerful search and filter system. Search by state, industry, grant type and more.',
    },
    {
      icon: FileText,
      title: 'Application Tracking',
      description:
        'Keep track of your grant applications from start to finish with our intuitive dashboard.',
    },
    {
      icon: Bookmark,
      title: 'Save & Organise',
      description:
        'Save grants that match your business and organise them in one place for easy access.',
    },
    {
      icon: BarChart3,
      title: 'Funding Insights',
      description:
        'Get valuable insights into funding trends and opportunities for your industry.',
    },
  ]

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-[180px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Side Text */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#0C2661] mb-6">
              Our Services
            </h1>
            <p className="text-[#424242] text-base font-normal leading-[150%] mb-4">
              Grants.com.au equips Australian businesses with powerful tools, data-driven insights, and expert resources
              to discover, manage, and secure government funding. Our platform streamlines the entire grant journey—from
              identifying eligible grants that align with your strategic objectives, to organizing applications and
              monitoring progress in one centralized location.
            </p>
            <p className="text-[#424242] text-base font-normal leading-[150%] mb-8">
              With intuitive search capabilities, personalized recommendations, and intelligent management tools, we
              enable you to stay ahead of deadlines and concentrate on your core priority—business growth. Whether you
              are a startup pursuing early-stage capital or an established enterprise seeking expansion funding, our
              platform delivers efficiency, transparency, and simplicity. Find opportunities, claim funding, and
              prosper.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-12 px-[45px] !bg-gradient  hover:bg-gradient text-[#EFF4FD]  font-semibold rounded-lg">
                Find Grants
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 border-2 bg-[#E7F1FE] border-[#0C2661] text-[#0C2661] text-base hover:bg-[#E7F1FE]/90 font-semibold rounded-lg"
              >
                Get Started Free
              </Button>
            </div>
          </div>

          {/* Right Side Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.title}
                  className="bg-[linear-gradient(90.93deg,#CCE5FF_3.19%,#D7E8FB_96.81%)] border-0 rounded-2xl transition-shadow py-[60px] px-6"
                  style={{ boxShadow: '0px 1px 2px 0px #0000000D' }}
                >
                    <CardHeader className="">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#B6D3FB] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#0C2661]" />
                  </div>
                </CardHeader>
                  <CardContent>
                  <p className="text-[#0C2661] text-xl font-bold mb-2">{service.title}</p>
                    <p className="text-gray-700 text-sm">{service.description}</p>
                  </CardContent>
                </Card>

              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
