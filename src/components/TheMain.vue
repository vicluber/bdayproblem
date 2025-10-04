<template>
    <div v-if="!selected">
        <div v-if="teamsArray.length === 0" class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">Cargando equipos...</p>
        </div>
        <div v-else>
            <div class="instructions fade-in">
                <h3>Selecciona un equipo para verificar el paradoja</h3>
                <p>Haz clic en cualquier escudo para ver si algún jugador comparte cumpleaños</p>
            </div>
            <ul>
                <li v-for="(item, index) in teamsArray" :key="index" @click="selectLeague(item.players, item.team_name)" 
                    class="team-card" :style="{ animationDelay: `${index * 0.1}s` }">
                    <img :src="item.team_badge" width="80" height="80" />
                    <div class="team-name">{{ item.team_name }}</div>
                </li>
            </ul>
        </div>
    </div>
    <div class="p-5 results-container" v-if="selected">
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
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .team-card {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
        animation: slideInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    li:hover {
        transform: translateY(-8px) scale(1.05);
        border-color: #007bff;
        box-shadow: 0 12px 35px rgba(0,123,255,0.25);
    }
    
    li::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s;
    }
    
    li:hover::before {
        left: 100%;
    }
    
    li img {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    li:hover img {
        transform: scale(1.15) rotate(5deg);
    }
    .text-muted {
        color: #6c757d;
    }
    .fade-in {
        opacity: 0;
        animation: fadeIn 0.8s ease-out 0.2s forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
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
        transform: translateY(10px);
        animation: slideInFade 0.6s ease-out 0.4s forwards;
        opacity: 0;
    }
    .instructions p {
        color: #adb5bd;
        margin: 0;
        font-size: 0.9rem;
        transform: translateY(10px);
        animation: slideInFade 0.6s ease-out 0.6s forwards;
        opacity: 0;
    }
    
    @keyframes slideInFade {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .team-name {
        font-size: 0.9rem;
        font-weight: 600;
        color: #495057;
        margin-top: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.3s ease;
        transform: translateY(5px);
        opacity: 0.8;
    }
    
    li:hover .team-name {
        transform: translateY(0);
        opacity: 1;
        color: #007bff;
    }
    
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-text {
        margin-top: 20px;
        color: #6c757d;
        font-size: 1.1rem;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
    }
    
    .results-container {
        opacity: 0;
        transform: translateY(20px);
        animation: slideInResults 0.6s ease-out 0.1s forwards;
    }
    
    @keyframes slideInResults {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
