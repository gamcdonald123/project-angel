class CreateSafePlaces < ActiveRecord::Migration[7.1]
  def change
    create_table :safe_places do |t|
      t.string :name
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
