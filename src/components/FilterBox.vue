<template>
	<div @click="fire" :class="filter + ' filter-item'" :style="`background-image:url(${image})`">
		<slot></slot>	

		<!-- <slot name="a"></slot>
		<slot name="b"></slot>
		<slot name="c"></slot> -->
	</div>
	
	<!-- 태그안에 데이터 바인딩할때만 <slot></slot>을 쓸 수 있다. -->

	<!-- 
		slot 여러개 사용하는 법
		1. <slot name="a"></slot>
		2. <template b-slot:a> 보낼거 </template>
	-->

</template>
<script>
	export default {
		name: 'filterbox',
		props : {
			image : String,
			filter: String
		},
		methods: {
			fire() {
				this.emitter.emit('filtername', this.filter) //mitt 라이브러리
			}
		}
	}
</script>
<style>
	.filter-item {
		width: 100px;
		height: 100px;
		margin: 10px 10px 10px auto;
		padding: 8px;
		display: inline-block;
		color : white;
		background-size: cover;
		background-position : center;
	}
	.filter-item span {
		background: black;
		padding: 1px 5px;
	}
</style>