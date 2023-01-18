<template>
	<div>
		<div v-if="step==0">
			<Post :posting="posting[i]" v-for="(a, i) in posting" :key="i"/>
		</div>

		<!-- 필터선택페이지 -->
		<div v-if="step==1">
			<div :class="selectFilter + ' upload-image'" :style="`background-image:url(${image})`"></div>
			<div class="filters">

				<!-- -->
				<FilterBox :filter="filter" :image="image" v-for="filter in filters" :key="filter" >
					<span>{{ filter }}</span>
					<!-- <template v-slot:a>데이터1</template>
					<template v-slot:b>데이터2</template>
					<template v-slot:c>데이터3</template> -->
				</FilterBox>
			</div>
		</div>

		<!-- 글작성페이지 -->
		<div v-if="step==2">
			<div :class="selectFilter + ' upload-image'"  :style="`background-image:url(${image})`"></div>
			<div class="write">
				<textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
			</div>		
		</div>

		<!-- 마이페이지 -->
		<div v-if="step==3">
			<Mypage></Mypage>
		</div>
	</div>
</template>

<script>
    import Post from './Post.vue';
    import FilterBox from './FilterBox.vue';
    import Mypage from './Mypage.vue';
    
	export default {
		name: 'Container',
		data() {
			return {
				filters : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
				selectFilter: '',
			}
		},
		components: {
			Post,
			FilterBox,
			Mypage
		},
        props : {
            posting : Array,
			step: Number,
			image: String,
			write: String,
        },
		mounted() { // mitt 수신하기
			this.emitter.on('filtername', (a)=> {
				console.log(a);
				this.selectFilter = a;
			})
		}
	}
</script>

<style>
.upload-image {
	width: 100%;
	height: 450px;
	background: rgba(0,0,0,.1);
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
}
.filters {
	overflow-x: scroll;
	white-space: nowrap;
}
.filter-1 {
	width: 100px;
	height: 100px;
	background-color: cornflowerblue;
	margin: 10px 10px 10px auto;
	padding: 8px;
	display: inline-block;
	color: white;
	background-size: cover;
}
.filters::-webkit-scrollbar {
	height: 5px;
}
.filters::-webkit-scrollbar-track {
	background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
	background: #555;
}
.write-box {
	border: none;
	width: 90%;
	height: 100px;
	padding: 15px;
	margin: auto;
	display: block;
	outline: none;
}
</style>
