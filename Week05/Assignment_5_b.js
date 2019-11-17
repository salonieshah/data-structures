// Saloni Shah
// Data Structure: Assignment 05 
// Date: 28 September 2019

//Lets Get Started
// 1. Create dependencies and configure
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
    // console.log (AWS);
var async = require('async');

// 2. Connect to dynamodb
var dynamodb = new AWS.DynamoDB();

// 3. Create an empty array to push blog entry items
var blogEntries = [];

// 4. Create categories and declare data types
class BlogEntry {
    constructor(category, date, number, title, content, keyword, source) {
        this.category = {}; //Category Partition Key
        this.category.S = category;
        this.created = {}; //Time Created Sort Key
        this.created.S = new Date(date).toLocaleString();
        this.number = {};
        this.number.N = number;
        this.title = {}; // Blog Content
        this.title.S = title;
        this.content = {}; // Blog Content
        this.content.S = content;
        this.keyword = {}; // Keywords
        this.keyword.S = keyword;
        this.external_link = {}; // External Links
        this.external_link.S = source;
    }
  }

// 5. Push items in the empty array
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Concepts',    
                    'August 3, 2019 00:30', // Is equivalent to 3 Aug 2019 at 00:30 EDT (07:00pm UTC)
                    '1',
                    'Earth is getting hotter than Chris Hemsworth!',
                    'Oh my god, look at this man! Don’t get distracted but we would be talking about something way more important in this session i.e. Global Temperature Rise (Please don’t be disappointed). ‘Green House Effect’ plays a vital role in increasing global temperature resulting in enhanced impacts of Climate Change. Fun Fact: Fun Fact: The concentration of carbon dioxide (CO2) is 408 parts per million in our atmosphere, as of 2018. It is the highest it has been in 3 million years.In a nutshell, our atmosphere is comprised of nitrogen, oxygen and the green house gases.  These greenhouse gases absorb the heat and make earth a habitable place for all living creatures. However, the humans have been intervening in this natural system by additionally releasing the green house gases in the atmosphere (mostly post industrialization) resulting in trapping additional heat in the lower atmosphere and affect the global climate. Most of the modern problems that we know of have occurred due to the additional carbon dioxide in the atmosphere. I won’t be wrong if I was saying “Our modern lives are powered on the cost of our own planet.” Everything we do from the food we consume, the car we drive, the buildings we live in, the electricity we consume to the products we use; contribute in increasing the green house effects. I know we can’t boycott everything! I would suggest indulging into one habit, “Reduce and Reuse”. Try to cut down on things that you don’t need like switch off that light when you don’t need it, repair that leaking tap, use a cloth bag, or make your own compost. I mean use everything and anything that can either be reused or recycled endlessly. These changes are not much to ask for I swear (I have done it). These would extensively reduce your individual impact and let me tell you; it’s going to make the difference in the bigger picture. So let’s just kick start and give this a try!',
                    'Green House Effect',
                    'none',
                    )
                );
                

blogEntries.push(new BlogEntry
                    (//category, date, title, content, keyword, source
                    'Concepts', 
                    'August 4, 2019 19:00', // Is equivalent to 4 Aug 2019 at 19:00 EDT (11:00pm UTC)
                    '2',
                    'Green to Grey',
                    'Fun Fact: According to the World Wildlife Fund (WWF), earth loses 18.7 million acres of forests every year, which is equal to 27 soccer fields every minute. Woahhhhh, that doesn’t sound good. Forests are one of most important natural sinks ingesting our carbon dioxide and other green house gases. Furthermore, forests are also home to millions of species of flora and fauna. Believe it or not, if they go extinct; we go extinct. Let’s imagine a scenario where we destroy all the forests to have a luxurious life.  Trees reduce soil erosion, acts as a fertilizing agent for the soil, and attract rain, without them earth would turn to dessert and believe me you won’t enjoy sipping that vintage wine in that case. The climate would become unpredictable; it might rain heavily in summers destroying farmer’s crops i.e. your food (Just in case you know its already happening). By planting a tree you’re not becoming savior of earth; but rather you’re saving yourself from starvation, you’re cleaning the air so you can breathe, you’re saving yourself from that catastrophic heat wave. We are a mean species and we do only things that benefit us and trust me this is going to help us survive; you, me, our families, our grandchildren. So find sometime for yourself, teach your children to value nature and get that ass up and plant a tree. Help it grow and it would help you survive. A very simple rule of nature you would get what you give. Conclusively in short, plant a tree in your backyard, at your way to school, in your society, at a garden, anywhere on the earth. Now goooooooooo. No wait read the fun fact below. Fun fact: While you read this, 7 acre of forest are wiped out already.',
                    'Carbon Sinks',
                    'None'
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, title, content, keyword, source
                    'Definations', 
                    'August 6, 2019 20:00', // Is equivalent to 4 Aug 2019 at 19:00 EDT (11:00pm UTC)
                    '3',
                    'What is Climate Change?', 
                    'To understand climate change, it is important to understand what is climate. “Climate refers to the long-term regional or even global average of temperature, humidity and rainfall patterns over seasons, years or decades.” Climate has been changing for centuries due to various natural causes. The predominant factor is variation in sunlight; various other factors like change in earth’s axis affecting where and when sunlight falls on the surface, volcanic eruptions and variations in sun also have an impact. These changes happen in long periods, Hence they cannot be blamed for the recent events of rapid heating. The human intervention during and post Industrial revolution is expected to be the current cause of climate change. The predominant reason is burning of fossil fuels that release heat trapping gases into Earth’s atmosphere. The witnesses are melting glaciers, rising sea level, extreme weather events and species extinction.', 
                    'Climate', 
                    'NASA', 
                    )
                );

blogEntries.push(new BlogEntry
                    (//category, date, title, content, keyword, source
                    'Definations', 
                    'August 10, 2019 18:00', // Is equivalent to 4 Aug 2019 at 17:00 EDT (11:00pm UTC)
                    '4',
                    'What is Global Warming?', 
                    'Global warming refers to increase in temperature which is resultant of enormous release of greenhouse gases in the atmosphere of the earth. According to an ongoing temperature analysis conducted by scientists at NASA’s Goddard Institute for Space Studies (GISS), the average global temperature on earth has increased by about 0.8° Celsius (1.4° Fahrenheit) since 1880. Two-thirds of the warming has occurred since 1975, at a rate of roughly 0.15-0.20°C per decade. The global temperature majorly depends on the amount of energy earth receives from the sun and the amount it radiates back into space. These quantities have very minor change. The amount of energy radiated by the planet depends significantly on the chemical composition of the atmosphere, particularly the amount of heat-trapping greenhouse gases.',
                    'Global Warming', 
                    'NASA Earth Observatory', 
                    )
                );

blogEntries.push(new BlogEntry
                    (//category, date, title, content, keyword, source
                    'Definations', 
                    'August 10, 2019 18:00', // Is equivalent to 4 Aug 2019 at 17:00 EDT (11:00pm UTC)
                    '5',
                    'What is Global Warming?', 
                    'Global warming refers to increase in temperature which is resultant of enormous release of greenhouse gases in the atmosphere of the earth. According to an ongoing temperature analysis conducted by scientists at NASA’s Goddard Institute for Space Studies (GISS), the average global temperature on earth has increased by about 0.8° Celsius (1.4° Fahrenheit) since 1880. Two-thirds of the warming has occurred since 1975, at a rate of roughly 0.15-0.20°C per decade. The global temperature majorly depends on the amount of energy earth receives from the sun and the amount it radiates back into space. These quantities have very minor change. The amount of energy radiated by the planet depends significantly on the chemical composition of the atmosphere, particularly the amount of heat-trapping greenhouse gases.',
                    'Global Warming', 
                    'NASA Earth Observatory', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, title, content, keyword, source
                    'India', 
                    'August 15, 2019 15:00', // Is equivalent to 4 Aug 2019 at 14:00 EDT (11:00pm UTC)
                    '6',
                    'What is the evidence of climate change in India?', 
                    'India is ranked 177 out of 180 countries in Environmental Performance Index 2018, released by Yale University and Columbia University in collaboration with the World Economic Forum. It has tumbled from 141 in the last ranking in 2016.',
                    'Evidence', 
                    '2018 Environmental Performance Index', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, title, content, keyword, source
                    'India', 
                    'August 25, 2019 20:00', // Is equivalent to 4 Aug 2019 at 19:00 EDT (11:00pm UTC)
                    '7',
                    'Temperature Rise in India', 
                    "Centre for Science and Environment released a study named India warming analysis for understanding the change in India's temperature graph in the last 116 years (from 1901 to 2017). The mean temperature has increased by 1.2 degrees Celsius in India.",
                    'Temperature Rise', 
                    'Express News Service', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'August 25, 2019 20:00', // Is equivalent to 4 Aug 2019 at 19:00 EDT (11:00pm UTC)
                    '8',
                    'Temperature Rise in India', 
                    "Centre for Science and Environment released a study named India warming analysis for understanding the change in India's temperature graph in the last 116 years (from 1901 to 2017). The mean temperature has increased by 1.2 degrees Celsius in India.",
                    'Temperature Rise', 
                    'Express News Service', 
                    )
                );

blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'September 2, 2019 14:00', // Is equivalent to 4 Aug 2019 at 13:00 EDT (11:00pm UTC)
                    '9',
                    'Warming Oceans', 
                    "The warming in Indian Ocean during the past century has been estimated up to 1.2 degree C, which is very large compared to a global surface warming of up to 0.8 degree Celsius during the same period.",
                    'Oceans', 
                    'First Post', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'September 6, 2019 18:00', // Is equivalent to 4 Aug 2019 at 17:00 EDT (11:00pm UTC)
                    '10',
                    'Shrinking Ice Sheets', 
                    "One of the biggest icebergs on record broke away from Antarctica between July 10 and 12. The one-trillion tonne iceberg, measuring 5,800 square km was already floating before it broke away so there is no immediate impact on sea levels. The larger volume of ice entering in the ocean might result into sea level rise.",
                    'Glaciers', 
                    'Hindustan Times', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'September 10, 2019 18:00', // Is equivalent to 4 Aug 2019 at 17:00 EDT (11:00pm UTC)
                    '11',
                    'Glacial Retreat ', 
                    'In 1999, a report by the Working Group on Himalayan Glaciology (WGHG) of the International Commission for Snow and Ice (ICSI) stated: “glaciers in the Himalayas are receding faster than in any other part of the world and, if the present rate continues, the livelihood of them disappearing by the year 2035 is very high”.',
                    'Glaciers', 
                    'World Wildlife Foundation', 
                    )
                );

blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'September 12, 2019 16:00', // Is equivalent to 4 Aug 2019 at 15:00 EDT (11:00pm UTC)
                    '12',
                    'Decreased Snow Cover', 
                    'International Centre for Integrated Mountain Development (ICIMOD) carried out a research “Climate and topographic controls on snow cover dynamics in the Hindu Kush Himalaya.” indicates decrease in snow cover. The research suggests that snow cover area in all basins except Jhelum is decreasing across the altitudinal range, and in all aspects.',
                    'Snow Cover', 
                    'International Centre for Integrated Mountain Development', 
                    )
                );


blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'September 14, 2019 16:00', // Is equivalent to 4 Aug 2019 at 15:00 EDT (11:00pm UTC)
                    '13',
                    'Sea Level Rise', 
                    'The Global Environmental Outlook (GEO-6): Regional Assessments said nearly 40 million Indians will be at risk from rising sea levels by 2050, with people in Mumbai and Kolkata having the maximum exposure to coastal flooding in future.',
                    'Sea Level Rise', 
                    'Times of India', 
                    )
                );


blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'September 18, 2019 20:00', // Is equivalent to 4 Aug 2019 at 19:00 EDT (11:00pm UTC)
                    '14',
                    'Extreme Events', 
                    'In year 2017, nearly 40% of the districts in India face the prospect of drought, while close to 25% districts have had heavy rainfall of more than 100mm in just couple of hours. Sudden heavy rainfall was witnessed this year in cities like Mumbai, Chandigarh and Bangalore.',
                    'Drought', 
                    'Hindustan Times', 
                    )
                );


blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'September 20, 2019 16:00', // Is equivalent to 4 Aug 2019 at 15:00 EDT (11:00pm UTC)
                    '15',
                    'Ocean Acidification', 
                    'A study was undertaken by National Institute of Oceanography (NIO) which links pollution to changes observed in the ocean acidity and carbon dioxide exchange in coastal Bay of Bengal. The rate of acidification of oceanic water with subsequent decrease in the pH value in northern Bay of Bengal (Vizag-Bengal region) is fastest than elsewhere in the world, making this region a highly acidifying zone. The global rate of decrease in pH value is 0.0019 unit/year, while the rate is as high 0.006 u/year in the Bay of Bengal revealed the study.',
                    'Ocean', 
                    'Times of India', 
                    )
                );


blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'September 21, 2019 09:00', // Is equivalent to 4 Aug 2019 at 18:00 EDT (11:00pm UTC)
                    '16',
                    'Bio Diversity Extinction', 
                    'Climate change has a serious impact on wide range of bio diversities. The extinction might result in the disturbance of the eco systems. The species assists the eco systems by doing things like preventing soil erosion and degradation, purifying the water from natural sources, fertilizes plants and crops, and much more. The absence or disturbance of these systems might have hazardous result such as land degradation, reduction in agriculture, polluted water or exposure to life threatening diseases.',
                    'Bio Diversity', 
                    'None', 
                    )
                );


blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'September 22, 2019 22:00', // Is equivalent to 4 Aug 2019 at 20:00 EDT (11:00pm UTC)
                    '17',
                    'Temperature will continue to rise', 
                    'There would be constant rise in the temperature which would be unusual and unprecedented. The west coast and southern India are predicted to warm by 4°C.',
                    'Temperature Rise', 
                    'None', 
                    )
                );


blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'September 24, 2019 23:00', // Is equivalent to 4 Aug 2019 at 22:00 EDT (11:00pm UTC)
                    '18',
                    'Change in precipitation patterns', 
                    'A decline in the monsoon rainfalls in India has already been observed. Abrupt and frequent flooding would be witnessed followed by frequent and drier droughts.',
                    'Rain', 
                    'None', 
                    )
                );


blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'September 25, 2019 18:00',
                    '19',
                    'More Droughts and Heat waves', 
                    'There would be extreme and frequent droughts creating problems such as decline in agricultural production, scarcity in water or death of living beings.',
                    'Disasters', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'September 26, 2019 12:00',
                    '20',
                    'Reduction in ground water', 
                    'Due to population explosion the ground water resources are already overexploited. Due to increasing needs there would be soon scarcity of ground water resulting today zero.',
                    'Ground Water', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'September 28, 2019 18:00',
                    '21',
                    'Glacier Retreat', 
                    'The melting of Glaciers might result in flooding of the rivers. It would lead to various other issues such as scarcity of fresh water, negative impact on agriculture and sea level rise.',
                    'Glacier', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'September 30, 2019 11:00',
                    '22',
                    'Sea Level Rise', 
                    'The rise in the sea level can have devastating impacts on the costal habitats. The consequences could be worsening with seawater reaches inland such as soil erosion, flooding, soil contamination and loss of habitat for various species.',
                    'Water', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'October 1, 2019 08:00',
                    '23',
                    'Ocean Acidification', 
                    'Ocean acidification refers to a reduction in the pH of the ocean over an extended period of time, caused primarily by uptake of carbon dioxide (CO2) from the atmosphere. Ocean acidification might result negatively on the bio diversity of oceans and also lead to extinction of certain species.',
                    'Water', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'October 4, 2019 11:00',
                    '24',
                    'Agriculture and food security', 
                    'The factors like water scarcity, droughts and heat waves, change in precipitation patterns, soil erosion and degradation, intrusion of sea water etc. would result into shortage of food products.',
                    'Food', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'October 6, 2019 14:00',
                    '25',
                    'Deteriorating Health', 
                    'The health conditions are expected to degrade. The exposure to heart and lung diseases and other life threading diseases will increase constantly. For instance the transmission of malaria and other vector-borne diseases was limited due to cooler temperatures. But due to the heat the virus is likely to spread.',
                    'Health', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Consequences', 
                    'October 8, 2019 16:00',
                    '26',
                    'Migration and Conflict', 
                    'The disaster affected population is expected to migrate to safer lands giving birth to certain political and social conflicts. The scarcity and distribution of fresh water might also become the major cause of conflict among countries.',
                    'Migration', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'India', 
                    'October 10, 2019 18:00',
                    '27',
                    'Agencies in India', 
                    "The Ministry of Environment, Forest and Climate Change (MoEFCC) is the nodal agency in the administrative structure of the Central Government for the planning, promotion, co-ordination and overseeing the implementation of India's environmental and forestry policies and programmes. The National Environmental Awareness Campaign (NEAC) was launched in mid-1986 with the objective of creating environmental awareness at the national level. In this campaign, nominal financial assistance is provided to NGOs, schools, colleges, universities, research institutes, women and youth organizations, army units, government departments etc. from all over the country for conducting awareness raising and action-oriented activities. My program would fit in the Climate Change (CC) division of the department (India)Centre for Environment Education was established in August 1984 in support of the Ministry of Environment, Forest and Climate Change, Government of India. CEE, a national institution with its headquarters in Ahmedabad, has the mandate to promote environmental awareness nationwide. (Centre for Environment Education)Centre for Science and Environment (CSE) is a public interest research and advocacy organization based in New Delhi. It is one of leading environmental NGO of India. (CSE)",
                    'Agencies', 
                    'None', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Mitigation', 
                    'October 12, 2019 13:00',
                    '28',
                    'Renewable Energy', 
                    'Attempt to use energy generated from cleaner sources such as wind, solar, geothermal, hydro and others and reduce the intake of energy generated from non-sustainable sources.',
                    'Renewable Energy', 
                    'None', 
                    )
                );
                
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Mitigation', 
                    'October 15, 2019 11:00',
                    '29',
                    'Appropriate Transportation',
                    'Cycle or walk to nearby places. Use public transport and shared vehicles for commutation. Attempt to use green vehicles and avoid vehicles burning extensive fossil fuels. Hence, the museum would intend to explain the above discussed aspects through various methods of exhibition so the visitor understands the information thoroughly.',
                    'Transportation', 
                    'None', 
                    )
                );
                
                
blogEntries.push(new BlogEntry
                    (//category, date, number, title, content, keyword, source
                    'Mitigation', 
                    'October 18, 2019 05:00',
                    '30',
                    'Reduce – Recycle – Reuse',
                    'Reduce your consumption, attempt to recycle the majority of the products and give priority to recycled products.', 
                    'Recycle', 
                    'None', 
                    )
                );

    // console.log(blogEntries);   

// 6. Create a for loop to push all the items in the array
var params = {};
var i = 0 ;
    for (i=0; i < blogEntries.length; i++){
        params.Item += blogEntries[i];  
        }
params.TableName = "blog";

    // dynamodb.putItem(params, function (err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else console.log(data); // successful response
    //     setTimeout(data, 2000);
    // });
// console.log(params);

// 7. Use .eachSeries to console log errors and set timeout
async.eachSeries(blogEntries, function(value, callback) {
    params.Item = value;
    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
    
setTimeout(callback, 2000);
}); 