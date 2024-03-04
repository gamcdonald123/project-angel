class AddColumnsToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :home_latitude, :float
    add_column :users, :home_longitude, :float
    add_column :users, :current_latitude, :float
    add_column :users, :current_longitude, :float
  end
end
