class AddFacebookTokenToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :facebook_token, :string
  end
end
