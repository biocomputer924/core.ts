import expects from "core/expects"

export default expects<readonly {
	"first-name": string
	"phonetic-first-name": string
	"gender": import("core/gender").default
}[]>()(<const> [
	{
		"first-name": "太郎",
		"phonetic-first-name": "たろう",
		"gender": "male"
	},
	{
		"first-name": "達郎",
		"phonetic-first-name": "たつろう",
		"gender": "male"
	},
	{
		"first-name": "一郎",
		"phonetic-first-name": "いちろう",
		"gender": "male"
	},
	{
		"first-name": "次郎",
		"phonetic-first-name": "じろう",
		"gender": "male"
	},
	{
		"first-name": "三郎",
		"phonetic-first-name": "さぶろう",
		"gender": "male"
	},
	{
		"first-name": "五郎",
		"phonetic-first-name": "ごろう",
		"gender": "male"
	},
	{
		"first-name": "花子",
		"phonetic-first-name": "はなこ",
		"gender": "female"
	},
	{
		"first-name": "梅子",
		"phonetic-first-name": "うめこ",
		"gender": "female"
	},
	{
		"first-name": "園子",
		"phonetic-first-name": "そのこ",
		"gender": "female"
	},
	{
		"first-name": "時子",
		"phonetic-first-name": "ときこ",
		"gender": "female"
	},
	{
		"first-name": "詩子",
		"phonetic-first-name": "うたこ",
		"gender": "female"
	}
])
