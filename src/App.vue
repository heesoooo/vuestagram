<template>
	<div>
		<div class="header">
			<ul class="header-button-left">
				<li v-if="step < 1">Cancel</li>
				<li v-else @click="step--">Cancel</li>
			</ul>
			<ul class="header-button-right">
				<li v-if="step == 1" @click="step++">Next</li>
				<li v-if="step == 2" @click="publish">발행</li>
			</ul>
			<img src="./assets/logo.png" class="logo" />
		</div>

		<!-- vuex test -->
		<!-- <h4> 안녕 {{ $store.state.name }} 야</h4>
		<p>나이는 : {{ $store.state.age }} 살이야</p>
		<button @click="$store.commit('nameChange')">이름변경버튼</button>
		<button @click="$store.commit('increment', 10)">나이증가버튼</button> -->
		<!-- state의 어떤 수정이 요구될때
			store.js에 state수정방법정의 후
			store.js에 부탁하기 
			부탁하려면 $store.commit(함수명) -> mutations에 부탁
		-->

		<!-- <p> {{ name }} {{ 카운터 }}</p>
		<button @click="카운터++">버튼</button> -->

		<Container :posting="posting" :step="step" :image="image" @write="write = $event" />

		<button v-if="step == 0" @click="more">더보기</button>

		<!-- <p>{{ $store.state.more }}</p>
		<button @click="$store.dispatch('getData')">더보기 버튼</button> -->
		<!-- 부탁하려면 $store.dispatch(함수명) -> actions 부탁 -->

		<div class="footer" v-if="step == 0">
			<ul class="footer-button-plus">
				<li>
					<input @change="upload" accept="image/*" type="file" id="file" class="inputfile" />
					<label for="file" class="input-plus">+</label>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Container from './components/Container.vue'
	import postdata from './postdata.js'
	import axios from 'axios'
	import { mapState } from 'vuex'

	export default {
		name: 'App',
		data() {
			return {
				posting : postdata,
				clickData : 0,
				step : 0,
				image : '',
				write : '',
				selectFilter: '',
				카운터: 0,
			}
		},
		methods: {
			publish() {
				var mynotice = {
					name: "Minny",
					userImage: "https://placeimg.com/100/100/animals",
					postImage: this.image,
					likes: 49,
					date: "Apr 4",
					liked: false,
					content: this.write,
					filter: this.selectFilter,
				};
				this.posting.unshift(mynotice); // postdata.js에 내 데이터를 젤 앞으로 끼워넣는법 !!!!!
				this.step = 0;
				//console.log(mynotice.filter);
			},
			more() {				
				// 데이터를 전송할때
				// axios.post('URL', {name : 'kim'}).then().catch((err)=>{
				// 	err
				// }) //catch는 실패시
				
				// 데이터를 받을때
				axios.get(`https://codingapple1.github.io/vue/more${this.clickData}.json`)
				.then( result => {
					//console.log(result.data);
					this.posting.push(result.data);
					this.clickData++;
				})
			},
			// (방법 1) FileReader() 파일을 글자로 변환해줌
			// (방법 2) URL.createObjectURL() 이미지의 가상 URL을 생성해줌
			upload(e) {
				let file = e.target.files
				console.log(file[0].type)
				let url = URL.createObjectURL(file[0])
				console.log(url);
				this.image = url
				this.step++;
			},		
		
			now(){
				return new Date();
			}
		},

		computed : {
			// name() {
			// 	return this.$store.state.name
			// },
			// now2(){
			// 	return new Date();
			// },
			//...mapState(['name', 'age', 'likes']),
			//...mapState([작명 : 'name',]),
		}, 
		//  methods vs computed
		// methods함수는 사용할 때마다 실행된다.
		// computed 함수는 한번만 실행 후 사용해도 실행되지 않는다/ 처음 실행하고 값을 간직.

		components: {
			Container
		},
		mounted() { // mitt 수신하기
			this.emitter.on('filtername', (a)=> {
				//console.log(a);
				this.selectFilter = a;
			})
		}
	}
</script>

<style>
	body {
		margin: 0;
	}

	ul {
		padding: 5px;
		list-style-type: none;
	}

	.logo {
		width: 22px;
		margin: auto;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 13px;
	}

	.header {
		width: 100%;
		height: 40px;
		background-color: white;
		padding-bottom: 8px;
		position: sticky;
		top: 0;
	}

	.header-button-left {
		color: skyblue;
		float: left;
		width: 50px;
		padding-left: 20px;
		cursor: pointer;
		margin-top: 10px;
	}

	.header-button-right {
		color: skyblue;
		float: right;
		width: 50px;
		cursor: pointer;
		margin-top: 10px;
	}

	.footer {
		width: 100%;
		position: sticky;
		bottom: 0;
		padding-bottom: 10px;
		background-color: white;
	}

	.footer-button-plus {
		width: 80px;
		margin: auto;
		text-align: center;
		cursor: pointer;
		font-size: 24px;
		padding-top: 12px;
	}

	.sample-box {
		width: 100%;
		height: 600px;
		background-color: bisque;
	}

	.inputfile {
		display: none;
	}

	.input-plus {
		cursor: pointer;
	}
</style>
