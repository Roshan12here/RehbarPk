
const column1 = [
  "Karachi",
  "Lahore",
  "Faisalabad",
  "Rawalpindi",
  "Gujranwala",
  "Peshawar",
  "Multan",
  "Hyderabad",
  "Islamabad",
  "Quetta",
  "Bahawalpur",
  "Sargodha",
  "Sialkot",
  "Sukkur",
  "Larkana",
  "Rahim Yar Khan"
];

const column2 = [
  "Sheikhupura",
  "Jhang",
  "Dera Ghazi Khan",
  "Gujrat",
  "Sahiwal",
  "Wah Cantt",
  "Mardan",
  "Kasur",
  "Okara",
  "Swat",
  "Nawabshah",
  "Chiniot",
  "Kotri",
  "Kamoke",
  "Hafizabad",
  "Sadiqabad"
];

const column3 = [
  "Mirpur Khas",
  "Burowala",
  "Hafizabad",
  "Bahauddin",
  "Mandi Bahauddin",
  "Khuzdar",
  "Pano Akil",
  "Kandhkot",
  "Dina",
  "Kharian",
  "Padidan",
  "Kotri",
  "Kamoke",
  "Khairpur",
  "Hub"
];

const column4 = [
  "Daska",
  "Gojra",
  "Dadu",
  "Muridke",
  "Bahawalnagar",
  "Samundri",
  "Tando Allahyar",
  "Jaranwala",
  "Chishtian",
  "Muzaffarabad",
  "Attock",
  "Vehari",
  "Kot Abdul Malik",
  "Chakwal",
  "Kamalia",
  "Kot Addu"
];

const column5 = [
  "Wazirabad",
  "Mansehra",
  "Layyah",
  "Mirpur",
  "Swabi",
  "Chaman",
  "Taxila",
  "Nowshera",
  "Khushab",
  "Mianwali",
  "Lodhran",
  "Hasilpur",
  "Charsadda",
  "Bhakkar",
  "Sambrial",
  "Narowal"
];


import Link from 'next/link';

export default function Component() {
  return (
    <div className="px-4 py-8 md:px-6 lg:px-8 bg-[#f5f3f3]">
      <div className="flex flex-col mb-5">
          <h2 className="text-lg font-medium font-sans">Cities</h2>
        <h2 className="text-lg  my-6 sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter">
              Search Top Destination and Businesses in your City
            </h2>
        </div>
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {[column1, column2, column3, column4, column5].map((column, index) => (
            <div key={index} className="space-y-2 shrink-0 w-[300px] mb-6">
              <ul className="space-y-1 text-sm text-muted-foreground font-sans">
                {column.map(city => (
                  <li key={city}>
                    <Link href={`/cities/${city.toLowerCase().replace(/ /g, '-')}`}>
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

  
        