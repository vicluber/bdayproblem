<template>
    <div v-if="!selected">
        <div class="instructions">
            <h3>Selecciona un equipo para verificar el paradoja</h3>
            <p>Haz clic en cualquier escudo para ver si algún jugador comparte cumpleaños</p>
        </div>
        <ul>
            <li v-for="(item, index) in teamsArray" :key="index" @click="selectLeague(item.players, item.team_name)">
                <img :src="item.team_badge" width="80" height="80" />
                <div class="team-name">{{ item.team_name }}</div>
            </li>
        </ul>
    </div>
    <div class="p-5" v-if="selected">
        <p v-html="results"></p>
        
        <!-- Check if sharedBirthdays is empty -->
        <div v-if="sharedBirthdays.length === 0" class="p-5">
            <h5 class="text-muted">{{ $t("theMain.noResults") }}</h5>
        </div>
        
        <!-- Render sharedBirthdays if not empty -->
        <div v-else>
            <div class="p-5" v-for="(item, index) in sharedBirthdays" :key="index">
                <h5 class="green">{{ $t("theMain.resultTitle") }}</h5>
                <div class="d-flex flex-wrap">
                    <div class="d-flex flex-column" v-for="(p, i) in item" :key="i">
                        <div class="text-center"><b>{{ p.name }}</b></div>
                        <div class="p-2">
                            <img :src="p.image" width="150" height="150" onerror="this.src='fallback-image.png'" />
                        </div>
                        <div class="text-center">{{ p.birthdate }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teamsArray: [],
            sharedBirthdays: [],
            selected: false,
            numberOfPlayers: '',
            probability: '',
            teamName: '',
            results: ''
        }
    },
    inject: ['axios'],
    mounted() {
        this.axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=6b873b00f9eed5bf43812c9bc9b94bace618019f506e74edc477e79de1e2662d')
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
                this.probability = (1 - p.toFixed(2)) * 100;
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
            this.sharedBirthdays = [];
            for (let key in countMap) {
                if(countMap[key].length >= 2){
                    this.sharedBirthdays.push(countMap[key])
                }
            }
            this.selected = !this.selected
            this.results = this.$i18n.t('theMain.resultDescription', { teamName: this.teamName, numberOfPlayers: this.numberOfPlayers, probability: this.probability })
        }
    },
}
</script>

<style scoped>
    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }
    li {
        flex: 0 0 140px;
        padding: 15px;
        cursor: pointer;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        transition: all 0.3s ease;
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        text-align: center;
    }
    li:hover {
        transform: translateY(-5px);
        border-color: #007bff;
        box-shadow: 0 8px 25px rgba(0,123,255,0.2);
    }
    li img {
        transition: transform 0.3s ease;
    }
    li:hover img {
        transform: scale(1.1);
    }
    .text-muted {
        color: #6c757d;
    }
    .instructions {
        text-align: center;
        margin: 20px;
        padding: 10px;
    }
    .instructions h3 {
        color: #6c757d;
        margin-bottom: 5px;
        font-size: 1rem;
        font-weight: 500;
    }
    .instructions p {
        color: #adb5bd;
        margin: 0;
        font-size: 0.9rem;
    }
    .team-name {
        font-size: 0.9rem;
        font-weight: 600;
        color: #495057;
        margin-top: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
