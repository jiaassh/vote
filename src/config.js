
let config = {};
const server = process.env.VUE_APP_BASE_URL
const base = {
	resSuccessCode: 1000,
	uploadImgApi: server + 'upload/upload',
	downloadExcel: server + 'staff/exportExcle/',
	uploadImgAccept:".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PNG,.GIF",
	mock:false,
	temDown:server,
}
config = {...base,'httpServer':server}
export default config
