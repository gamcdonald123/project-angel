
Crime.create(category: "anti-social-behaviour", latitude: 51.578766, longitude: 0.072174, street: "On or near A123", month: "2024-01")

Crime.create(category: "anti-social-behaviour", latitude: 51.540025, longitude: 0.072159, street: "On or near Cowbridge Road", month: "2024-01")

Crime.create(category: "burglary", latitude: 51.555521, longitude: 0.071922, street: "On or near Shopping Area", month: "2024-01")

Crime.create(category: "criminal-damage-arson", latitude: 51.641999, longitude: 0.072353, street: "On or near Longcroft Rise", month: "2024-01")

Crime.create(category: "theft-from-the-person", latitude: 51.555521, longitude: 0.071922, street: "On or near Shopping Area", month: "2024-01")

puts "Seeded database with 5 crimes"


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
