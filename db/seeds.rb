require 'URI'

Report.destroy_all
User.destroy_all
Crime.destroy_all
SafePlace.destroy_all

crimes_url = "https://data.police.uk/api/crimes-street/all-crime?poly=51.546767,-0.098853:51.546321,-0.055275:51.520231,-0.079147"

response = URI.open(crimes_url).read
data = JSON.parse(response)

count = 0
data.each do |crime|
  if (crime["category"] == "violent-crime")
    Crime.create(category: crime["category"], latitude: crime["location"]["latitude"], longitude: crime["location"]["longitude"], street: crime["location"]["street"]["name"], month: crime["month"])
    puts "Created crime: #{crime["category"]}"
  end
end

puts "Seeded database with police API"

puts "Creating logins for team"

User.create(email: "nicole@nicole.com", password: "password", first_name: "Nicole", last_name: "Nicole")

User.create(email: "mirela@mirela.com", password: "password", first_name: "Mirela", last_name: "Mirela")

User.create(email: "tony@tony.com", password: "password", first_name: "Tony", last_name: "Tony")

User.create(email: "guy@guy.com", password: "password", first_name: "Guy", last_name: "Guy")


puts "Creating 6 safe places"

SafePlace.create!(name: "Betty's place", latitude: 51.579386, longitude: 0.072610)

SafePlace.create!(name: "RCCG Hall of Mercy", latitude: 51.540441, longitude: 0.072561)

SafePlace.create!(name: "London Inn", latitude: 51.554890, longitude: 0.077832)

SafePlace.create!(name: "Monique's place", latitude: 51.64396, longitude: 0.07553)

SafePlace.create!(name: "Angela's place", latitude: 51.55283, longitude: 0.07288)

SafePlace.create!(name: "St Leonard's Hospital", latitude: 51.533977813717286, longitude: -0.07677840204843199)


puts "Seeding completed"
