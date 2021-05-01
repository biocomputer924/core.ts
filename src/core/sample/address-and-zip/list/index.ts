import expects from "core/expects"

export default expects<{
	"zip": string
	"address": import("core/japan/address").default
}[]>()([
	{
		zip: "163-8001",
		address: {
			prefecture: "東京都",
			address1: "新宿区西新宿",
			address2: "２丁目８−１",
			address3: "1階",
			phonetic_address: "シンジュククニシシンジュク"
		}
	},
	{
		zip: "604-0925",
		address: {
			prefecture: "京都府",
			address1: "京都市中京区寺町通御池上る上本能寺前町",
			address2: "488 番地",
			address3: "2階",
			phonetic_address: "キョウトシナカギョウクテラマチドオリミイケアガルカミホンノウジ"
		}
	},
	{
		zip: "540-8570",
		address: {
			prefecture: "大阪府",
			address1: "大阪市中央区大手前",
			address2: "２丁目",
			address3: "3階",
			phonetic_address: "オオサカシチュウオウクオオテマエ"
		}
	}
])
