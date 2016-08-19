999.times do |n|
  name = n
  email = "example#{n}@chatapp.com"
  password = "password"
  User.create!(name: name,
        email: email,
        password: password,
        password_confirmation: password)
end
