

export function Stats() {
  const stats = [
    {

      number: '1,285',
      label: 'Business Grants Database',
    },
    {

      number: '$50B+',
      label: 'Combined Grants Value',
    },
    {
  
      number: '119,184',
      label: 'Businesses Supported',
    },
    {
    
      number: '$2,958,641,621',
      label: 'In Grant Funding Secured Through Our Platform',
    },
  ]

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8  ">
      <div className=" container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
          
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
              
                <div className="text-[24px] font-bold text-[#0C2661] mb-2">
                  {stat.number}
                </div>
                <p className="text-[#424242] text-base">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
