class CreateCrimes < ActiveRecord::Migration[7.1]
  def change
    create_table :crimes do |t|
      t.string :category
      t.float :latitude
      t.float :longitude
      t.string :street
      t.string :month

      t.timestamps
    end
  end
end
