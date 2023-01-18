<template>
	<div>
		<div class="header">
			<ul class="header-button-left">
				<li v-if="step > 0" @click="step--">Cancel</li>
			</ul>
			<ul class="header-button-right">
				<li v-if="step == 1" @click="step++">Next</li>
				<li v-if="step == 2" @click="publish">발행</li>
			</ul>
			<img src="./assets/logo.png" class="logo" />
		</div>

		<Container :posting="posting" :step="step" :image="image" @write="write = $event" />

		<button v-if="step == 0 && btnMore==true" @click="more" class="btn-more">더보기 ▼</button>		
		
		<div class="footer" v-if="step == 0">			
			<ul class="footer-button-plus">
				<li>
					<input @change="upload" accept="image/*" type="file" id="file" class="inputfile" />
					<label for="file" class="input-plus">➕ 게시물추가</label>
				</li>
			</ul>		
		</div>
	</div>
</template>

<script>
	import Container from './components/Container.vue'
	import postdata from './postdata.js'
	import axios from 'axios'
	//import { mapState } from 'vuex'

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
				btnMore: true,
				isShow: true,
			}
		},
		methods: {
			isToggle() {
				this.isShow = !this.isShow;
			},
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
				// 데이터를 받을때
				axios.get(`https://codingapple1.github.io/vue/more${this.clickData}.json`)
				.then( result => {
					//console.log(result.data);
					this.posting.push(result.data);
					this.clickData++;
				}).catch( error => {
					alert('더이상 게시물이 없습니다');
					this.btnMore = false;
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
		margin: 0; padding: 0;
	}

	ul {
		margin: 0;
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
		z-index: 99;
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
		border-top:1px solid #ddd;
		background-color: white;
	}

	.footer-button-plus {
		padding: 0;
		text-align: center;
		cursor: pointer;
		font-size: 24px;
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
		display: block;
		width: 100%;
		height: 50px;
		line-height: 50px;
		cursor: pointer;
		font-size: 13px;
	}

	.btn-more {
		display: block;
		outline: none;
		border: none;
		padding: 10px 0;
		width: 100%;
		cursor: pointer;
		font-size: 12px;
		font-weight: bold;
		color: black;
	}
</style>
