class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, :omniauth_providers => [:facebook]

  # Finds existing user or creates a new one with auth_hash coming from a Facebook login attempt
  # @param auth_hash [String] Hash string
  def find_or_create_from_auth_hash(auth_hash)
    facebook_token = auth_hash['credentials']['token']
    facebook_email = auth_hash['extra']['raw_info']['email']
    facebook_name = auth_hash['extra']['raw_info']['name']
    user = User.find_by_email(facebook_email)
    if !user
      user_info = {
        email: facebook_email,
        facebook_token: facebook_token,
        name: facebook_name
      }
      User.create(user_info)
    end
    false
  end

end
