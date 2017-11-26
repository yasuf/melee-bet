class SessionsController < ApplicationController
  def create
    byebug

    email = get_facebook_email
    name = get_facebook_name
    @user = User.find_or_create_from_auth_hash(auth_hash)

    session[:user_id] = auth_hash['credentials']['token']

    # self.current_user = @user
    # redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

  def facebook_token
    auth_hash['credentials']['token']
  end

  def get_facebook_email
    auth_hash['extra']['raw_info']['email']
  end

  def get_facebook_name
    auth_hash['extra']['raw_info']['name']
  end
end
