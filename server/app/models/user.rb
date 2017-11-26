class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, :omniauth_providers => [:facebook]
  # Finds existing user or creates a new one with auth_hash
  # @param auth_hash [String] Hash string
  def find_or_create_from_auth_hash(auth_hash)
    # byebug
  end
end
