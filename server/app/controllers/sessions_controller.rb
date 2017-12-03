class SessionsController < ApplicationController
  def create
    email = facebook_email
    name = facebook_name
    @user = User.find_or_create_from_auth_hash(auth_hash)

    session[:user_id] = @user.id

    self.current_user = @user
    redirect_to '/'
  end

  protected

  # Omniauth hash
  def auth_hash
    request.env['omniauth.auth']
  end

end
