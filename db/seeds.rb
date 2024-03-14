require 'uri'

Report.destroy_all
Message.destroy_all
Chatroom.destroy_all
Crime.destroy_all
SafePlace.destroy_all
Post.destroy_all
Community.destroy_all
User.destroy_all

# crimes_url = "https://data.police.uk/api/crimes-street/all-crime?poly=51.546767,-0.098853:51.546321,-0.055275:51.520231,-0.079147"

# response = URI.open(crimes_url).read
# data = JSON.parse(response)

# count = 0
# data.each do |crime|
#   if (crime["category"] == "violent-crime")
#     Crime.create(category: crime["category"], latitude: crime["location"]["latitude"], longitude: crime["location"]["longitude"], street: crime["location"]["street"]["name"], month: crime["month"])
#     puts "Created crime: #{crime["category"]}"
#   end
# end

# puts "Seeded database with police API"

puts "Creating logins for team"

User.create(email: "nicole@nicole.com", password: "password", first_name: "Nicole", last_name: "Farinello", home_longitude: -0.06362942153767116, home_latitude: 51.499646012648455, photo: Rails.root.join("app", "assets", "images", "profile_pic_nicole.jpg").open)

User.create(email: "mirela@mirela.com", password: "password", first_name: "Mirela", last_name: "Mustic", home_longitude: -0.20725414692570132, home_latitude: 51.51226541189122, photo: Rails.root.join("app", "assets", "images", "profile_pic_mirela.jpg").open)

User.create(email: "antonia@antonia.com", password: "password", first_name: "Antonia", last_name: "Propato", home_longitude: -0.13857370577050818, home_latitude: 51.54714321927489, photo: Rails.root.join("app", "assets", "images", "profile_pic_antonio.jpeg").open)

User.create(email: "gayle@gayle.com", password: "password", first_name: "Gayle", last_name: "McDonald", home_longitude: -0.09346231382179586, home_latitude: 51.54364009099498, photo: Rails.root.join("app", "assets", "images", "profile_pic_guy.jpeg").open)


# puts "Creating 6 safe places"

# SafePlace.create!(name: "Betty's place", latitude: 51.579386, longitude: 0.072610)

# SafePlace.create!(name: "RCCG Hall of Mercy", latitude: 51.540441, longitude: 0.072561)

# SafePlace.create!(name: "London Inn", latitude: 51.554890, longitude: 0.077832)

# SafePlace.create!(name: "Monique's place", latitude: 51.64396, longitude: 0.07553)

# SafePlace.create!(name: "Angela's place", latitude: 51.55283, longitude: 0.07288)

# SafePlace.create!(name: "St Leonard's Hospital", latitude: 51.533977813717286, longitude: -0.07677840204843199)

puts "Creating 3 chat rooms"

Chatroom.create(name: "Tips & tricks", sender_id: 1)
Chatroom.create(name: "Places to avoid", sender_id: 1)
Chatroom.create(name: "Safe places", sender_id: 1)

puts "Creating 3 communities"

Community.create!(name: "📋 Tips & Tricks 📋")

Community.create!(name: "🚕 Modes of transport 🚈")

Community.create!(name: "⛔️ Places to avoid ⛔️")

puts "Creating community posts"

# Tips & Tricks

Post.create!(title: "✅ Tips for choosing your route ✅", content: "When choosing your route, always try to stick to well-lit and busy areas. Avoid shortcuts through alleys and parks, and always stay on main roads.", user_id: 2, community_id: 1)

Post.create!(title: "👀 Be as aware as possible 👂", content: "When walking at night, always be aware of your surroundings. Keep your phone in your pocket and your headphones out of your ears. Relying on all your senses and your gut feeling is the best strategy.", user_id: 1, community_id: 1)

Post.create!(title: "🤝 Stay together 👭", content: "If you're walking with friends, always try to stay together. If you're walking alone, try to walk with someone else or in a group.", user_id: 1, community_id: 1)

Post.create!(title: "🤙 Stay in touch 📣", content: "Always let someone know where you're going and when you're expected to be back. If you're going to be late, let them know.", user_id: 1, community_id: 1)

Post.create!(title: "🍻 Never leave a drink unattended 🍷", content: "If you're out at a bar or a club, never leave your drink unattended. If you do, don't drink it when you come back.", user_id: 1, community_id: 1)

# Modes of transport

Post.create!(title: "🚶‍♂️ Walking 🚶‍♀️", content: "Walking is a great way to get around, but it's important to be aware of your surroundings. Always stick to well-lit and busy areas, and avoid shortcuts through alleys and parks.", user_id: 2, community_id: 2)

Post.create!(title: "🚲 Cycling 🚲", content: "Cycling trumps walking with speed and manoeuvrability. Cyclists usually aren't targetted due to these advantages.", user_id: 2, community_id: 2)

Post.create!(title: "🚈 Public transport 🚈", content: "Public transport is the most efficient way to travel around London. The tube is generally very safe, though drunk passengers at night can be a nuissance. The same can be said for buses, but with more chance of intoxicated passengers. Take the tube over the bus wherever you can.", user_id: 2, community_id: 2)

Post.create!(title: "🚕 Taxis 🚕", content: "Taxis are a safe way to travel, but always make sure you're getting into a licensed taxi. If you're unsure, ask the driver for their badge number and check it with the TFL website. Though more expensive than other ways of getting around, they are probably the safest form, getting you door to door.", user_id: 2, community_id: 2)

# Places to avoid

Post.create!(title: "🚫 Avoiding parks 🚫", content: "Parks are generally not safe at night. If you're walking through a park, always stick to the main paths and avoid shortcuts. Parks are much less likely to have good lighting, so all the more reason to avoid.", user_id: 2, community_id: 3)

Post.create!(title: "🚫 Avoiding alleys 🚫", content: "Alleys are a big no-no. They're usually poorly lit and deserted, making them a prime target for potential criminal activity. Always stick to main roads and well-lit areas.", user_id: 2, community_id: 3)

Post.create!(title: "🚫 Avoiding quiet streets 🚫", content: "Quiet streets mean you aren't near other people. Your best form of defense in a compromising situation is to be near other people. Use the busiest streets and areas you can find for as much of your route as possible. Only dive into quiet streets for the very last part of your journey.", user_id: 2, community_id: 3)


puts "Seeding completed"
