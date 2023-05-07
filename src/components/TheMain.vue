<script>
export default {
    data() {
        return {
            teamsArray: [],
            sharedBirthdays: [],
            selected: false,
            numberOfPlayers: '',
            probability: '',
            teamName: ''
        }
    },
    inject: ['axios'],
    mounted() {
        this.axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=44&APIkey=6b873b00f9eed5bf43812c9bc9b94bace618019f506e74edc477e79de1e2662d')
        .then(response => {
            this.teamsArray = response.data
        })
        .catch(error => console.log(error))
    },
    methods: {
        selectLeague(teamPlayers, team_name) {
            this.numberOfPlayers = teamPlayers.length;
            this.teamName = team_name;
            let p = 1.0
            for (let i = 1; i <= this.numberOfPlayers; i++) {
                p = p * (366 - i) / 365
                this.probability = 1 - p.toFixed(2);
            }
            const result = teamPlayers.map(({ player_name, player_image, player_birthdate }) => {
                const modifiedBirthdate = player_birthdate.substring(5);
                return { player_name, player_image, player_birthdate, modifiedBirthdate: modifiedBirthdate };
            });
            let countMap = [];
            for (let player of result) {
                if (!countMap[player.modifiedBirthdate]) {
                    countMap[player.modifiedBirthdate] = [{name: player.player_name, image: player.player_image, birthdate: player.player_birthdate}];
                } else {
                    countMap[player.modifiedBirthdate].push({name: player.player_name, image: player.player_image, birthdate: player.player_birthdate});
                }
            }
            for (let key in countMap) {
                if(countMap[key].length >= 2){
                    this.sharedBirthdays.push(countMap[key])
                }
            }
            this.selected = !this.selected
        }
    }
}
</script>

<template>
    <ul v-if="!selected">
        <li v-for="(item, index) in teamsArray" :key="index" @click="selectLeague(item.players, item.team_name)">
            <img :src="item.team_badge" width="80" height="80" />
        </li>
    </ul>
    <div class="p-5" v-if="selected">
        For {{ teamName }} with <span class="green">{{ numberOfPlayers }}</span> players on its team has a <span class="green">{{ this.probability }}%</span> (rounding up) of probability that at least two players share their birthday.
        <div class="p-5" v-for="(item, index) in sharedBirthdays" :key="index">
            <h5 class="green">They were born the same day:</h5>
            <div class="d-flex flex-wrap">
                <div class="d-flex flex-column" v-for="(p, i) in item" :key="i">
                    <div class="text-center"><b>{{ p.name }}</b></div>
                    <div class="p-2"><img :src="p.image" width="150" height="150" onerror="this.src='fallback-image.png'" /></div>
                    <div class="text-center">{{ p.birthdate }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    ul {
        list-style: none;
        display: inline-flex;
        flex-wrap: wrap;
    }
    li {
        padding: 20px;
        cursor: pointer;
    }
</style>