
/* ---------------------------------------------------------
   1. MOCK DATA
   --------------------------------------------------------- */
const CATEGORIES = [
   { id: 'pho-bun', name: 'Phở & Bún', icon: '🍜' },
   { id: 'com', name: 'Cơm', icon: '🍚' },
   { id: 'banh', name: 'Bánh Mì & Bánh', icon: '🥖' },
   { id: 'cuon', name: 'Món Cuốn', icon: '🥬' },
   { id: 'lau-haisan', name: 'Lẩu & Hải Sản', icon: '🍲' },
   { id: 'trang-mieng', name: 'Chè & Tráng Miệng', icon: '🍧' },
   { id: 'ca-phe', name: 'Cà Phê', icon: '☕' },
   { id: 'nuoc-uong', name: 'Trà Sữa & Nước Ép', icon: '🧋' },
];

const RESTAURANTS = [
   { id: 'r1', name: 'Phở Ông Hùng', cuisine: 'Phở • Bún Việt', rating: 4.8, time: '20-30 phút', distance: '1.2 km', status: 'open', image: './images/restaurants/phoonghung.png' },
   { id: 'r2', name: 'Cơm Tấm Hưng Phát', cuisine: 'Cơm Tấm • Cơm Gà', rating: 4.7, time: '15-25 phút', distance: '2.0 km', status: 'open', image: './images/restaurants/comtamhungphat.png' },
   { id: 'r3', name: 'Bánh Mì Cô Lành', cuisine: 'Bánh Mì • Bánh Xèo', rating: 4.9, time: '10-20 phút', distance: '0.8 km', status: 'open', image: './images/restaurants/banhmicolanh.png' },
   { id: 'r4', name: 'Cuốn Sài Gòn Xưa', cuisine: 'Gỏi Cuốn • Nem Rán', rating: 4.6, time: '15-20 phút', distance: '1.5 km', status: 'open', image: './images/restaurants/banhcuonxua.png' },
   { id: 'r5', name: 'Lẩu Hải Sản Biển Đông', cuisine: 'Lẩu • Hải Sản', rating: 4.8, time: '25-35 phút', distance: '1.8 km', status: 'open', image: './images/restaurants/lauhaisanbiendong.png' },
   { id: 'r6', name: 'Chè Cô Hoa', cuisine: 'Chè • Tráng Miệng', rating: 4.9, time: '10-20 phút', distance: '0.6 km', status: 'closed', image: './images/restaurants/checohoa.png' },
   { id: 'r7', name: 'Cà Phê Sương Sớm', cuisine: 'Cà Phê Việt', rating: 4.7, time: '10-15 phút', distance: '0.9 km', status: 'open', image: './images/restaurants/caphesuongwsom.png' },
   { id: 'r8', name: 'Trà Sữa Ngọc Trai', cuisine: 'Trà Sữa • Nước Ép', rating: 4.6, time: '10-15 phút', distance: '1.1 km', status: 'open', image: './images/restaurants/trasuangoctrai.png' },
   { id: 'r9', name: 'Bún Chả Hà Nội', cuisine: 'Bún Chả • Nem Cua Bể', rating: 4.8, time: '15-25 phút', distance: '1.3 km', status: 'open', image: './images/restaurants/bunchahanoi.png' },
   { id: 'r10', name: 'Hủ Tiếu Nam Vang', cuisine: 'Hủ Tiếu • Bánh Canh', rating: 4.7, time: '15-25 phút', distance: '1.0 km', status: 'open', image: './images/restaurants/hutieu.png' },
];

const FOODS = [
   { id: 'f1', name: 'Phở Bò Tái Nạm', category: 'pho-bun', restaurantId: 'r1', price: 45000, oldPrice: 55000, rating: 4.9, ratingCount: 341, time: '20-30', desc: 'Nước dùng hầm xương 12 tiếng, bánh phở dai mềm, thịt bò tái nạm thái mỏng.', image: 'images/foods/f1-pho-bo-tai-nam.jpg', badge: 'Bán Chạy' },
   { id: 'f2', name: 'Phở Gà Ta', category: 'pho-bun', restaurantId: 'r1', price: 42000, rating: 4.7, ratingCount: 198, time: '15-25', desc: 'Gà ta thả vườn luộc chín tới, nước dùng ngọt thanh, da giòn thịt chắc.', image: 'images/foods/f2-pho-ga-ta.webp' },
   { id: 'f3', name: 'Bún Bò Huế Đặc Biệt', category: 'pho-bun', restaurantId: 'r1', price: 49000, rating: 4.8, ratingCount: 258, time: '20-30', desc: 'Đậm vị sả ớt đặc trưng xứ Huế, đầy đủ giò heo, chả cua, huyết.', image: 'images/foods/f3-bun-bo-hue-dac-biet.jpeg', badge: 'Nổi Bật' },
   { id: 'f4', name: 'Bún Riêu Cua', category: 'pho-bun', restaurantId: 'r1', price: 40000, rating: 4.6, ratingCount: 167, time: '15-20', desc: 'Gạch cua đồng thơm béo, cà chua chua dịu, đậu phụ chiên giòn.', image: 'images/foods/f4-bun-rieu-cua.jpg' },
   { id: 'f5', name: 'Bún Mọc', category: 'pho-bun', restaurantId: 'r1', price: 38000, rating: 4.5, ratingCount: 120, time: '15-20', desc: 'Mọc viên dai giòn, nước dùng xương ngọt thanh, măng khô giòn sần sật.', image: 'images/foods/f5-bun-moc.webp' },
   { id: 'f6', name: 'Phở Tái Lăn', category: 'pho-bun', restaurantId: 'r1', price: 47000, rating: 4.7, ratingCount: 143, time: '20-25', desc: 'Thịt bò lăn tỏi thơm lừng, nước phở đậm đà, hành lá tươi mát.', image: 'images/foods/f6-pho-tai-lan.jpg' },
   { id: 'f7', name: 'Bún Ốc Nguội', category: 'pho-bun', restaurantId: 'r1', price: 39000, rating: 4.6, ratingCount: 110, time: '15-20', desc: 'Vị chua thanh của giấm bỗng, ốc giòn sần sật, đậu phụ rán vàng.', image: 'images/foods/f7-bun-oc-nguoi.jpg' },
   { id: 'f8', name: 'Phở Sốt Vang', category: 'pho-bun', restaurantId: 'r1', price: 50000, rating: 4.8, ratingCount: 176, time: '20-30', desc: 'Bò hầm sốt vang đậm vị quế hồi, thịt mềm rục, nước sốt sánh thơm.', image: 'images/foods/f8-pho-sot-vang.png' },
   { id: 'f9', name: 'Bún Thang Hà Nội', category: 'pho-bun', restaurantId: 'r1', price: 46000, rating: 4.7, ratingCount: 98, time: '20-25', desc: 'Trứng chiên thái chỉ, giò lụa, thịt gà xé, nước dùng thanh ngọt tinh tế.', image: 'images/foods/f9-bun-thang-ha-noi.jpg' },
   { id: 'f10', name: 'Phở Gà Xé Phay', category: 'pho-bun', restaurantId: 'r1', price: 43000, rating: 4.6, ratingCount: 132, time: '15-25', desc: 'Ức gà xé mỏng, hành phi thơm giòn, nước dùng trong veo đậm vị.', image: 'images/foods/f10-pho-ga-xe-phay.jpg' },
   { id: 'f11', name: 'Cơm Tấm Sườn Bì Chả', category: 'com', restaurantId: 'r2', price: 55000, oldPrice: 65000, rating: 4.9, ratingCount: 302, time: '15-20', desc: 'Sườn nướng mật ong, bì heo, chả trứng hấp, ăn kèm nước mắm chua ngọt.', image: 'images/foods/f11-com-tam-suon-bi-cha.webp', badge: 'Bán Chạy' },
   { id: 'f12', name: 'Cơm Gà Xối Mỡ', category: 'com', restaurantId: 'r2', price: 48000, rating: 4.6, ratingCount: 154, time: '15-20', desc: 'Đùi gà chiên giòn rụm, cơm dẻo thơm, dưa leo và nước mắm gừng.', image: 'images/foods/f12-com-ga-xoi-mo.webp' },
   { id: 'f13', name: 'Cơm Tấm Sườn Nướng', category: 'com', restaurantId: 'r2', price: 50000, rating: 4.7, ratingCount: 189, time: '15-20', desc: 'Sườn cốt lết ướp sả ớt nướng than hoa, cơm tấm hạt tơi bùi béo.', image: 'images/foods/f13-com-tam-suon-nuong.jpg' },
   { id: 'f14', name: 'Cơm Gà Hải Nam', category: 'com', restaurantId: 'r2', price: 52000, rating: 4.8, ratingCount: 145, time: '15-20', desc: 'Gà luộc da vàng óng, cơm nấu nước luộc gà béo thơm, chấm xì dầu gừng.', image: 'images/foods/f14-com-ga-hai-nam.png', badge: 'Nổi Bật' },
   { id: 'f15', name: 'Cơm Chiên Dương Châu', category: 'com', restaurantId: 'r2', price: 45000, rating: 4.5, ratingCount: 133, time: '10-15', desc: 'Cơm chiên tôm, xúc xích, trứng và rau củ, hạt cơm săn tơi không dính.', image: 'images/foods/f15-com-chien-duong-chau.webp' },
   { id: 'f16', name: 'Cơm Tấm Bì Chả', category: 'com', restaurantId: 'r2', price: 44000, rating: 4.6, ratingCount: 121, time: '15-20', desc: 'Bì heo trộn thính thơm bùi, chả trứng hấp mềm, mỡ hành béo ngậy.', image: 'images/foods/f16-com-tam-bi-cha.webp' },
   { id: 'f17', name: 'Cơm Sườn Cốt Lết', category: 'com', restaurantId: 'r2', price: 46000, rating: 4.6, ratingCount: 108, time: '15-20', desc: 'Cốt lết chiên áp chảo giòn cạnh, ăn kèm đồ chua và nước mắm pha.', image: 'images/foods/f17-com-suon-cot-let.jpeg' },
   { id: 'f18', name: 'Cơm Gà Nướng Mật Ong', category: 'com', restaurantId: 'r2', price: 49000, rating: 4.7, ratingCount: 116, time: '15-20', desc: 'Đùi gà ướp mật ong nướng thơm phức, lớp da caramel giòn ngọt.', image: 'images/foods/f18-com-ga-nuong-mat-ong.jpg' },
   { id: 'f19', name: 'Cơm Tấm Sườn Ốp La', category: 'com', restaurantId: 'r2', price: 35000, rating: 4.4, ratingCount: 94, time: '10-15', desc: 'Trứng ốp la lòng đào béo mịn, chả trứng, mỡ hành, dưa leo tươi mát.', image: 'images/foods/f19-com-tam-suon-op-la.jpg' },
   { id: 'f20', name: 'Cơm Rang Thập Cẩm', category: 'com', restaurantId: 'r2', price: 43000, rating: 4.5, ratingCount: 87, time: '10-15', desc: 'Cơm rang cùng lạp xưởng, tôm khô, trứng và rau củ thập cẩm đầy đặn.', image: 'images/foods/f20-com-rang-thap-cam.jpg' },
   { id: 'f21', name: 'Bánh Mì Thịt Nướng', category: 'banh', restaurantId: 'r3', price: 25000, rating: 4.7, ratingCount: 276, time: '10-20', desc: 'Bánh mì giòn rụm, thịt nướng thơm lừng, pate béo ngậy, rau thơm tươi.', image: 'images/foods/f21-banh-mi-thit-nuong.jpg', badge: 'Bán Chạy' },
   { id: 'f22', name: 'Bánh Xèo Miền Tây', category: 'banh', restaurantId: 'r3', price: 39000, rating: 4.7, ratingCount: 168, time: '15-25', desc: 'Vỏ bánh giòn tan vàng ươm, nhân tôm thịt giá đỗ, cuốn rau sống chấm mắm.', image: 'images/foods/f22-banh-xeo-mien-tay.webp' },
   { id: 'f23', name: 'Bánh Mì Chả Cá', category: 'banh', restaurantId: 'r3', price: 28000, rating: 4.6, ratingCount: 142, time: '10-15', desc: 'Chả cá chiên vàng thơm nức mùi thì là, ăn kèm đồ chua giòn tan.', image: 'images/foods/f23-banh-mi-cha-ca.jpg' },
   { id: 'f24', name: 'Bánh Mì Xíu Mại', category: 'banh', restaurantId: 'r3', price: 26000, rating: 4.6, ratingCount: 119, time: '10-15', desc: 'Viên xíu mại sốt cà chua đậm đà, chan cùng bánh mì giòn nóng hổi.', image: 'images/foods/f24-banh-mi-xiu-mai.jpg' },
   { id: 'f25', name: 'Bánh Mì Ốp La', category: 'banh', restaurantId: 'r3', price: 24000, rating: 4.5, ratingCount: 101, time: '10-15', desc: 'Trứng ốp la lòng đào, pate, thịt nguội, rau thơm kẹp bánh mì nóng giòn.', image: 'images/foods/f25-banh-mi-op-la.webp' },
   { id: 'f26', name: 'Bánh Mì Pate Trứng', category: 'banh', restaurantId: 'r3', price: 22000, rating: 4.5, ratingCount: 88, time: '5-10', desc: 'Pate gan béo thơm, trứng chiên mềm, đồ chua giòn giòn chua ngọt.', image: 'images/foods/f26-banh-mi-pate-trung.jpg' },
   { id: 'f27', name: 'Bánh Khọt Vũng Tàu', category: 'banh', restaurantId: 'r3', price: 42000, rating: 4.8, ratingCount: 134, time: '15-20', desc: 'Bánh khọt giòn rụm nhân tôm tươi, nước cốt dừa béo, rau sống ăn kèm.', image: 'images/foods/f27-banh-khot-vung-tau.webp', badge: 'Nổi Bật' },
   { id: 'f28', name: 'Bánh Bao Nhân Thịt', category: 'banh', restaurantId: 'r3', price: 18000, rating: 4.4, ratingCount: 76, time: '5-10', desc: 'Vỏ bánh bao mềm xốp, nhân thịt băm trứng cút đậm đà, hấp nóng hổi.', image: 'images/foods/f28-banh-bao-nhan-thit.jpg' },
   { id: 'f29', name: 'Bánh Mì Gà Xé', category: 'banh', restaurantId: 'r3', price: 27000, rating: 4.6, ratingCount: 95, time: '10-15', desc: 'Gà xé phay trộn rau răm, mayonnaise béo nhẹ, bánh mì vỏ giòn ruột xốp.', image: 'images/foods/f29-banh-mi-ga-xe.jpg' },
   { id: 'f30', name: 'Bánh Cuốn Nóng', category: 'banh', restaurantId: 'r3', price: 32000, rating: 4.7, ratingCount: 112, time: '10-20', desc: 'Bánh cuốn tráng mỏng nhân thịt mộc nhĩ, hành phi thơm, chả lụa kèm theo.', image: 'images/foods/f30-banh-cuon-nong.jpg' },
   { id: 'f31', name: 'Gỏi Cuốn Tôm Thịt', category: 'cuon', restaurantId: 'r4', price: 35000, rating: 4.8, ratingCount: 201, time: '10-15', desc: 'Cuốn tươi mát với tôm, thịt luộc, bún và rau sống, chấm tương đậu phộng.', image: 'images/foods/f31-goi-cuon-tom-thit.jpg' },
   { id: 'f32', name: 'Nem Rán Hà Nội', category: 'cuon', restaurantId: 'r4', price: 38000, rating: 4.7, ratingCount: 145, time: '15-20', desc: 'Nem rán giòn tan nhân thịt, miến, mộc nhĩ, chấm nước mắm chua ngọt.', image: 'images/foods/f32-nem-ran-ha-noi.webp' },
   { id: 'f33', name: 'Bò Bía', category: 'cuon', restaurantId: 'r4', price: 22000, rating: 4.5, ratingCount: 98, time: '10-15', desc: 'Bánh tráng cuốn lạp xưởng, trứng, củ sắn giòn, chấm tương ngọt béo.', image: 'images/foods/f33-bo-bia.webp' },
   { id: 'f34', name: 'Cuốn Diếp Cá Tai Heo', category: 'cuon', restaurantId: 'r4', price: 34000, rating: 4.4, ratingCount: 72, time: '10-15', desc: 'Diếp cá tươi giòn cuốn cùng thịt heo luộc, bún, chấm mắm nêm đậm đà.', image: 'images/foods/f34-cuon-diep-ca-tai-heo.jpg' },
   { id: 'f35', name: 'Chả Giò Rế', category: 'cuon', restaurantId: 'r4', price: 40000, rating: 4.7, ratingCount: 127, time: '15-20', desc: 'Vỏ rế mỏng giòn tan, nhân tôm thịt cua đầy đặn, chấm mắm chua ngọt.', image: 'images/foods/f35-cha-gio-re.jpg', badge: 'Bán Chạy' },
   { id: 'f36', name: 'Nem Nướng Cuốn Bánh Tráng', category: 'cuon', restaurantId: 'r4', price: 45000, rating: 4.8, ratingCount: 156, time: '15-25', desc: 'Nem nướng thơm lừng cuốn bánh tráng, rau sống, chấm tương me đặc trưng.', image: 'images/foods/f36-nem-nuong-cuon-banh-trang.webp', badge: 'Nổi Bật' },
   { id: 'f37', name: 'Gỏi Cuốn Chay', category: 'cuon', restaurantId: 'r4', price: 30000, rating: 4.5, ratingCount: 64, time: '10-15', desc: 'Đậu hũ chiên, nấm và rau củ tươi cuốn bánh tráng, thanh đạm nhẹ nhàng.', image: 'images/foods/f37-goi-cuon-chay.webp' },
   { id: 'f38', name: 'Cuốn Diếp Tôm Nướng', category: 'cuon', restaurantId: 'r4', price: 37000, rating: 4.6, ratingCount: 81, time: '10-15', desc: 'Tôm nướng thơm cuốn cùng diếp cá, bún tươi, chấm nước mắm tỏi ớt.', image: 'images/foods/f38-uon-diep-tom-nuong.jpg' },
   { id: 'f39', name: 'Bánh Tráng Trộn', category: 'cuon', restaurantId: 'r4', price: 20000, rating: 4.6, ratingCount: 143, time: '5-10', desc: 'Bánh tráng trộn khô bò, xoài xanh, rau răm, đậu phộng và sa tế cay nồng.', image: 'images/foods/f39-banh-trang-tron.jpg' },
   { id: 'f40', name: 'Nem Lụi Huế', category: 'cuon', restaurantId: 'r4', price: 42000, rating: 4.7, ratingCount: 105, time: '15-20', desc: 'Nem lụi nướng xiên sả thơm, cuốn bánh tráng, chấm nước lèo đặc trưng Huế.', image: 'images/foods/f40-nem-lui-hue.webp' },
   { id: 'f41', name: 'Lẩu Thái Hải Sản', category: 'lau-haisan', restaurantId: 'r5', price: 189000, rating: 4.9, ratingCount: 128, time: '25-35', desc: 'Vị chua cay đặc trưng, đầy ắp tôm mực cá, ăn kèm rau và bún tươi.', image: 'images/foods/f41-lau-thai-hai-san.jpg', badge: 'Cao Cấp' },
   { id: 'f42', name: 'Hải Sản Nướng Mỡ Hành', category: 'lau-haisan', restaurantId: 'r5', price: 149000, rating: 4.7, ratingCount: 96, time: '25-35', desc: 'Set hải sản tươi sống nướng mỡ hành, thơm béo và đậm đà hương biển.', image: 'images/foods/f42-hai-san-nuong-mo-hanh.jpg' },
   { id: 'f43', name: 'Lẩu Cá Kèo', category: 'lau-haisan', restaurantId: 'r5', price: 159000, rating: 4.7, ratingCount: 84, time: '25-30', desc: 'Cá kèo tươi, nước lẩu chua lá giang thanh mát, rau đắng ăn kèm.', image: 'images/foods/f43-lau-ca-keo.webp' },
   { id: 'f44', name: 'Tôm Hấp Nước Dừa', category: 'lau-haisan', restaurantId: 'r5', price: 129000, rating: 4.8, ratingCount: 102, time: '15-20', desc: 'Tôm sú tươi hấp cùng nước dừa xiêm ngọt béo, chấm muối tiêu chanh.', image: 'images/foods/f44-tom-hap-nuoc-dua.jpg' },
   { id: 'f45', name: 'Mực Nướng Sa Tế', category: 'lau-haisan', restaurantId: 'r5', price: 139000, rating: 4.7, ratingCount: 91, time: '15-20', desc: 'Mực tươi nướng sa tế cay nồng, dai giòn sần sật, thơm lừng hấp dẫn.', image: 'images/foods/f45-muc-nuong-sa-te.jpg', badge: 'Bán Chạy' },
   { id: 'f46', name: 'Lẩu Riêu Cua Hải Sản', category: 'lau-haisan', restaurantId: 'r5', price: 179000, rating: 4.8, ratingCount: 77, time: '25-35', desc: 'Gạch cua béo ngậy hoà cùng hải sản tươi, nước lẩu chua thanh đậm vị.', image: 'images/foods/f46-lau-rieu-cua-hai-san.jpg' },
   { id: 'f47', name: 'Ốc Hương Rang Muối', category: 'lau-haisan', restaurantId: 'r5', price: 119000, rating: 4.6, ratingCount: 88, time: '15-20', desc: 'Ốc hương rang muối ớt thơm giòn, thịt ốc dai ngọt đậm đà.', image: 'images/foods/f47-oc-huong-rang-muoi.webp' },
   { id: 'f48', name: 'Cua Rang Me', category: 'lau-haisan', restaurantId: 'r5', price: 219000, rating: 4.9, ratingCount: 65, time: '20-30', desc: 'Cua thịt chắc rang cùng sốt me chua ngọt sánh quyện, đậm đà khó cưỡng.', image: 'images/foods/f48-cua-rang-me.jpg', badge: 'Cao Cấp' },
   { id: 'f49', name: 'Lẩu Cua Đồng', category: 'lau-haisan', restaurantId: 'r5', price: 169000, rating: 4.7, ratingCount: 73, time: '25-35', desc: 'Riêu cua đồng nguyên chất, cà chua, đậu phụ, rau muống tươi ăn kèm.', image: 'images/foods/f49-lau-cua-dong.jpg' },
   { id: 'f50', name: 'Ghẹ Hấp Bia', category: 'lau-haisan', restaurantId: 'r5', price: 189000, rating: 4.8, ratingCount: 69, time: '15-25', desc: 'Ghẹ tươi hấp bia sả thơm lừng, thịt ngọt chắc, chấm muối tiêu chanh.', image: 'images/foods/f50-ghe-hap-bia.webp' },
   { id: 'f51', name: 'Chè Thái Trân Châu', category: 'trang-mieng', restaurantId: 'r6', price: 29000, rating: 4.8, ratingCount: 210, time: '10-15', desc: 'Thạch nhiều màu, trân châu dai giòn, nước cốt dừa béo ngậy mát lạnh.', image: 'images/foods/f51-che-thai-tran-chau.jpg', badge: 'Ngọt Ngào' },
   { id: 'f52', name: 'Chè Khúc Bạch', category: 'trang-mieng', restaurantId: 'r6', price: 32000, rating: 4.7, ratingCount: 154, time: '10-15', desc: 'Khúc bạch béo mềm, hạnh nhân giòn tan, nhãn tươi và nước đường thơm mát.', image: 'images/foods/f52-che-khuc-bach.jpg' },
   { id: 'f53', name: 'Chè Bưởi', category: 'trang-mieng', restaurantId: 'r6', price: 27000, rating: 4.6, ratingCount: 132, time: '10-15', desc: 'Cùi bưởi giòn sần sật, đậu xanh bùi béo, nước cốt dừa thơm ngậy.', image: 'images/foods/f53-che-buoi.webp' },
   { id: 'f54', name: 'Chè Đậu Xanh Nước Cốt Dừa', category: 'trang-mieng', restaurantId: 'r6', price: 24000, rating: 4.5, ratingCount: 98, time: '10-15', desc: 'Đậu xanh nấu nhuyễn ngọt bùi, nước cốt dừa béo thơm, mát lạnh dịu nhẹ.', image: 'images/foods/f54-che-dau-xanh-nuoc-cot-dua.jpg' },
   { id: 'f55', name: 'Chè Ba Màu', category: 'trang-mieng', restaurantId: 'r6', price: 26000, rating: 4.6, ratingCount: 121, time: '10-15', desc: 'Đậu đỏ, đậu xanh, thạch dừa hoà quyện cùng nước cốt dừa béo ngậy.', image: 'images/foods/f55-che-ba-mau.jpg', badge: 'Bán Chạy' },
   { id: 'f56', name: 'Sữa Chua Nếp Cẩm', category: 'trang-mieng', restaurantId: 'r6', price: 28000, rating: 4.7, ratingCount: 143, time: '10-15', desc: 'Sữa chua mịn béo hoà cùng nếp cẩm dẻo thơm, ngọt thanh dễ chịu.', image: 'images/foods/f56-sua-chua-nep-cam.webp' },
   { id: 'f57', name: 'Chè Sương Sa Hạt Lựu', category: 'trang-mieng', restaurantId: 'r6', price: 25000, rating: 4.5, ratingCount: 87, time: '10-15', desc: 'Hạt lựu giòn sần sật, sương sa mát lạnh, nước cốt dừa thơm béo.', image: 'images/foods/f57-che-suong-sa-hat-luu.webp' },
   { id: 'f58', name: 'Rau Câu Dừa', category: 'trang-mieng', restaurantId: 'r6', price: 22000, rating: 4.4, ratingCount: 65, time: '10-15', desc: 'Rau câu mềm mịn vị dừa tự nhiên, thanh mát, ngọt dịu vừa phải.', image: 'images/foods/f58-rau-cau-dua.jpg' },
   { id: 'f59', name: 'Chè Đậu Đỏ', category: 'trang-mieng', restaurantId: 'r6', price: 23000, rating: 4.5, ratingCount: 79, time: '10-15', desc: 'Đậu đỏ ninh mềm bùi, nước đường thơm gừng, ăn kèm dừa nạo.', image: 'images/foods/f59-che-dau-do.webp' },
   { id: 'f60', name: 'Bánh Flan Caramel', category: 'trang-mieng', restaurantId: 'r6', price: 20000, rating: 4.8, ratingCount: 167, time: '5-10', desc: 'Flan mềm mịn tan trong miệng, lớp caramel đắng nhẹ hài hoà vị ngọt.', image: 'images/foods/f60-banh-flan-caramel.jpg', badge: 'Nổi Bật' },
   { id: 'f61', name: 'Cà Phê Sữa Đá', category: 'ca-phe', restaurantId: 'r7', price: 25000, rating: 4.8, ratingCount: 288, time: '5-10', desc: 'Cà phê phin nguyên chất, sữa đặc béo ngậy, đá mát lạnh đúng chất Việt.', image: 'images/foods/f61-ca-phe-sua-da.webp', badge: 'Bán Chạy' },
   { id: 'f62', name: 'Cà Phê Đen Đá', category: 'ca-phe', restaurantId: 'r7', price: 20000, rating: 4.6, ratingCount: 176, time: '5-10', desc: 'Cà phê phin đậm đà nguyên bản, vị đắng nhẹ hậu ngọt, đá mát lạnh.', image: 'images/foods/f62-ca-phe-den-da.jpeg' },
   { id: 'f63', name: 'Bạc Xỉu', category: 'ca-phe', restaurantId: 'r7', price: 27000, rating: 4.7, ratingCount: 154, time: '5-10', desc: 'Nhiều sữa ít cà phê, vị béo ngọt dịu nhẹ, thích hợp cho người mới uống.', image: 'images/foods/f63-bac-xiu.jpg' },
   { id: 'f64', name: 'Cà Phê Trứng', category: 'ca-phe', restaurantId: 'r7', price: 32000, rating: 4.8, ratingCount: 132, time: '5-10', desc: 'Lớp kem trứng đánh bông béo mịn phủ trên cà phê đậm đà, thơm ngậy.', image: 'images/foods/f64-ca-phe-trung.webp', badge: 'Nổi Bật' },
   { id: 'f65', name: 'Cà Phê Cốt Dừa', category: 'ca-phe', restaurantId: 'r7', price: 35000, rating: 4.7, ratingCount: 121, time: '5-10', desc: 'Cà phê hoà cùng nước cốt dừa béo mát, đá xay mịn, thơm lừng hấp dẫn.', image: 'images/foods/f65-ca-phe-cot-dua.jpg' },
   { id: 'f66', name: 'Cà Phê Muối', category: 'ca-phe', restaurantId: 'r7', price: 29000, rating: 4.6, ratingCount: 98, time: '5-10', desc: 'Vị mặn nhẹ của muối hoà cùng cà phê sữa béo, lạ miệng và cuốn hút.', image: 'images/foods/f66-ca-phe-muoi.png' },
   { id: 'f67', name: 'Espresso', category: 'ca-phe', restaurantId: 'r7', price: 30000, rating: 4.5, ratingCount: 64, time: '5-10', desc: 'Cà phê Ý nguyên chất, chiết xuất đậm đặc, hương thơm nồng nàn.', image: 'images/foods/f67-espresso.jpeg' },
   { id: 'f68', name: 'Cappuccino', category: 'ca-phe', restaurantId: 'r7', price: 38000, rating: 4.6, ratingCount: 87, time: '5-10', desc: 'Espresso hoà cùng sữa tươi đánh bông mịn màng, phủ bột cacao thơm.', image: 'images/foods/f68-cappuccino.jpg' },
   { id: 'f69', name: 'Cà Phê Sữa Nóng', category: 'ca-phe', restaurantId: 'r7', price: 24000, rating: 4.6, ratingCount: 76, time: '5-10', desc: 'Cà phê phin nóng hổi hoà quyện sữa đặc béo ngậy, ấm áp mỗi sáng.', image: 'images/foods/f69-ca-phe-sua-nong.jpg' },
   { id: 'f70', name: 'Freeze Cà Phê', category: 'ca-phe', restaurantId: 'r7', price: 36000, rating: 4.7, ratingCount: 109, time: '5-10', desc: 'Cà phê xay đá mịn tan, phủ kem tươi béo mát, sảng khoái ngày hè.', image: 'images/foods/f70-freeze-ca-phe.webp' },
   { id: 'f71', name: 'Trà Sữa Trân Châu Đường Đen', category: 'nuoc-uong', restaurantId: 'r8', price: 39000, rating: 4.7, ratingCount: 233, time: '5-10', desc: 'Trân châu đường đen dẻo thơm, trà sữa béo mịn, topping đầy đặn.', image: 'images/foods/f71-tra-sua-tran-chau-duong-den.webp', badge: 'Nổi Bật' },
   { id: 'f72', name: 'Trà Sữa Matcha', category: 'nuoc-uong', restaurantId: 'r8', price: 42000, rating: 4.6, ratingCount: 145, time: '5-10', desc: 'Vị matcha Nhật đậm đà hoà cùng sữa béo mịn, topping trân châu dai giòn.', image: 'images/foods/f72-tra-sua-matcha.jpg' },
   { id: 'f73', name: 'Trà Đào Cam Sả', category: 'nuoc-uong', restaurantId: 'r8', price: 35000, rating: 4.8, ratingCount: 198, time: '5-10', desc: 'Trà thơm hoà quyện đào ngâm giòn ngọt, cam tươi và sả thanh mát.', image: 'images/foods/f73-tra-dao-cam-sa.jpg', badge: 'Bán Chạy' },
   { id: 'f74', name: 'Nước Ép Cam', category: 'nuoc-uong', restaurantId: 'r8', price: 30000, rating: 4.7, ratingCount: 112, time: '5-10', desc: 'Cam tươi ép nguyên chất, vị chua ngọt tự nhiên, giàu vitamin C.', image: 'images/foods/f74-nuoc-ep-cam.webp' },
   { id: 'f75', name: 'Sinh Tố Bơ', category: 'nuoc-uong', restaurantId: 'r8', price: 34000, rating: 4.8, ratingCount: 134, time: '5-10', desc: 'Bơ sáp béo mịn xay cùng sữa đặc, đá mát lạnh, thơm béo đúng điệu.', image: 'images/foods/f75-sinh-to-bo.webp' },
   { id: 'f76', name: 'Trà Sữa Socola', category: 'nuoc-uong', restaurantId: 'r8', price: 40000, rating: 4.5, ratingCount: 89, time: '5-10', desc: 'Socola đậm đà hoà cùng trà sữa béo ngậy, topping thạch dai giòn.', image: 'images/foods/f76-tra-sua-socola.webp' },
   { id: 'f77', name: 'Nước Ép Dưa Hấu', category: 'nuoc-uong', restaurantId: 'r8', price: 28000, rating: 4.6, ratingCount: 97, time: '5-10', desc: 'Dưa hấu tươi ép mát lạnh, vị ngọt thanh tự nhiên, giải khát tức thì.', image: 'images/foods/f77-nuoc-ep-dua-hau.webp' },
   { id: 'f78', name: 'Trà Vải', category: 'nuoc-uong', restaurantId: 'r8', price: 33000, rating: 4.7, ratingCount: 121, time: '5-10', desc: 'Trà thơm hoà cùng vải ngâm ngọt thanh, đá mát lạnh sảng khoái.', image: 'images/foods/f78-tra-vai.avif' },
   { id: 'f79', name: 'Sinh Tố Xoài', category: 'nuoc-uong', restaurantId: 'r8', price: 34000, rating: 4.7, ratingCount: 108, time: '5-10', desc: 'Xoài chín xay mịn cùng sữa chua, vị chua ngọt hài hoà, mát lạnh.', image: 'images/foods/f79-sinh-to-xoai.webp' },
   { id: 'f80', name: 'Trà Sữa Thái Xanh', category: 'nuoc-uong', restaurantId: 'r8', price: 38000, rating: 4.6, ratingCount: 143, time: '5-10', desc: 'Trà Thái xanh thơm béo đặc trưng, hoà cùng sữa và trân châu đen dai giòn.', image: 'images/foods/f80-tra-sua-thai-xanh.jpg' },
];

const REVIEWS = [
   { name: 'Minh Anh', role: 'Người sành ăn', rating: 5, text: 'Đồ ăn giao siêu nhanh và vẫn còn nóng hổi. Giao diện đặt hàng cực kỳ mượt!', avatar: 'https://i.pravatar.cc/100?img=32' },
   { name: 'Đức Trọng', role: 'Khách hàng thân thiết', rating: 5, text: 'Trải nghiệm đặt món tốt nhất mình từng dùng. Giao diện cảm giác rất cao cấp.', avatar: 'https://i.pravatar.cc/100?img=12' },
   { name: 'Lan Phạm', role: 'Blogger ẩm thực', rating: 4, text: 'Chất lượng món ăn tuyệt vời, nhiều lựa chọn nhà hàng đa dạng.', avatar: 'https://i.pravatar.cc/100?img=45' },
   { name: 'Quốc Huy', role: 'Khách hàng đã xác thực', rating: 5, text: 'Thanh toán mượt mà, mã giảm giá áp dụng ngay lập tức. Rất đáng để thử!', avatar: 'https://i.pravatar.cc/100?img=8' },
   { name: 'Thu Huyền', role: 'Khách hàng', rating: 5, text: 'Ứng dụng đẹp, dễ dùng, phần yêu thích giúp mình đặt lại món quen rất nhanh.', avatar: 'https://i.pravatar.cc/100?img=47' },
   { name: 'Anh Khoa', role: 'Khách hàng đã xác thực', rating: 4, text: 'Nhiều nhà hàng đa dạng gần khu vực mình ở, thời gian giao hàng khá chính xác.', avatar: 'https://i.pravatar.cc/100?img=15' },
];

const FAQS = [
   { q: 'Tôi có cần đăng nhập để đặt món không?', a: 'Bạn có thể xem thực đơn và nhà hàng tự do, nhưng cần đăng nhập để thêm vào giỏ hàng, thanh toán hoặc lưu món yêu thích.' },
   { q: 'Thời gian giao hàng trung bình là bao lâu?', a: 'Tùy nhà hàng, thời gian giao hàng trung bình dao động từ 15 đến 35 phút kể từ khi xác nhận đơn hàng.' },
   { q: 'Tôi có thể thanh toán bằng những hình thức nào?', a: 'Foodio hỗ trợ thanh toán khi nhận hàng (COD), thẻ tín dụng/ghi nợ và ví điện tử.' },
   { q: 'Làm sao để theo dõi đơn hàng của tôi?', a: 'Sau khi đặt hàng, bạn có thể xem trạng thái chi tiết trong mục "Đơn hàng của tôi" tại trang Hồ sơ cá nhân.' },
   { q: 'Tôi có thể hủy đơn hàng sau khi đặt không?', a: 'Bạn có thể hủy đơn trong vòng 5 phút sau khi đặt tại mục Đơn hàng của tôi, trước khi nhà hàng xác nhận chế biến.' },
];

/* ---------------------------------------------------------
   2. STORAGE KEYS
   --------------------------------------------------------- */
const LS = {
   USERS: 'foodio_users',
   SESSION: 'foodio_session',
   CART: 'foodio_cart',
   WISHLIST: 'foodio_wishlist',
   ORDERS: 'foodio_orders',
   THEME: 'foodio_theme',
};

/* ---------------------------------------------------------
   3. GENERIC HELPERS
   --------------------------------------------------------- */
function getStore(key, fallback) {
   try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
   } catch (e) { return fallback; }
}
function setStore(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function formatPrice(n) { return Number(n).toLocaleString('vi-VN') + '₫'; }

function findFood(id) { return FOODS.find(f => f.id === id); }
function findRestaurant(id) { return RESTAURANTS.find(r => r.id === id); }

function starsHtml(rating, size = 14) {
   const full = Math.round(rating);
   let html = '<span class="stars">';
   for (let i = 0; i < 5; i++) {
      html += `<svg viewBox="0 0 24 24" style="width:${size}px;height:${size}px;opacity:${i < full ? 1 : .25}"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
   }
   html += '</span>';
   return html;
}

/* ---------------------------------------------------------
   4. TOAST NOTIFICATIONS
   --------------------------------------------------------- */
function ensureToastWrap() {
   let wrap = document.querySelector('.toast-wrap');
   if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
   }
   return wrap;
}
function showToast(message, type = 'default') {
   const wrap = ensureToastWrap();
   const toast = document.createElement('div');
   toast.className = `toast ${type}`;
   const icon = type === 'success'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : type === 'error'
         ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>'
         : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
   toast.innerHTML = `${icon}<span>${message}</span>`;
   wrap.appendChild(toast);
   setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
   }, 3200);
}

/* ---------------------------------------------------------
   5. LOADING SCREEN
   --------------------------------------------------------- */
window.addEventListener('load', () => {
   const loader = document.getElementById('loading-screen');
   if (loader) setTimeout(() => loader.classList.add('hidden'), 400);
});

/* ---------------------------------------------------------
   6. SCROLL PROGRESS + SCROLL TO TOP + HEADER SHADOW
   --------------------------------------------------------- */
function initScrollFx() {
   const progress = document.getElementById('scroll-progress');
   const topBtn = document.getElementById('scroll-top');
   const header = document.getElementById('site-header');
   window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      if (progress) progress.style.width = pct + '%';
      if (topBtn) topBtn.classList.toggle('show', scrollTop > 400);
      if (header) header.classList.toggle('scrolled', scrollTop > 30);
   });
   if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------
   7. CART BADGE (used by every page's header)
   --------------------------------------------------------- */
function updateCartBadge() {
   const cart = getStore(LS.CART, []);
   const count = cart.reduce((sum, i) => sum + i.qty, 0);
   document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
   });
}

/* ---------------------------------------------------------
   8. FOOD CARD RENDERER (shared by home / menu / detail / wishlist)
   --------------------------------------------------------- */
function foodCardHtml(food) {
   const wishlist = getStore(LS.WISHLIST, []);
   const isFav = wishlist.includes(food.id);
   const rest = findRestaurant(food.restaurantId);
   return `
  <div class="food-card reveal" data-id="${food.id}">
    <div class="food-card__media">
      <a href="food-detail.html?id=${food.id}">
        <img src="${food.image}" alt="${food.name}" loading="lazy">
      </a>
      ${food.badge ? `<span class="food-card__badge ${food.oldPrice ? 'discount' : ''}">${food.badge}</span>` : ''}
      <button class="food-card__fav ${isFav ? 'active' : ''}" data-fav="${food.id}" aria-label="Yêu thích">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.5-10-9.5C.5 6.5 3 3 6.5 3c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 3 23.5 6.5 22 11.5 19.5 16.5 12 21 12 21z"/></svg>
      </button>
    </div>
    <div class="food-card__body">
      <div class="food-card__top">
        <a href="food-detail.html?id=${food.id}" class="food-card__name">${food.name}</a>
        <span class="food-card__rating">${food.rating.toFixed(1)}
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
        </span>
      </div>
      <p class="food-card__desc">${food.desc}</p>
      <div class="food-card__meta">
        <span>⏱ ${food.time} phút</span>
        <span>🏬 ${rest ? rest.name : ''}</span>
      </div>
      <div class="food-card__bottom">
        <span class="food-card__price">${formatPrice(food.price)}${food.oldPrice ? `<small>${formatPrice(food.oldPrice)}</small>` : ''}</span>
        <button class="food-card__add" data-add="${food.id}" aria-label="Thêm vào giỏ hàng">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

function renderFoodGrid(container, foods) {
   if (!container) return;
   if (!foods.length) {
      container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <h3>Không tìm thấy món ăn nào</h3>
        <p>Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn.</p>
      </div>`;
      return;
   }
   container.innerHTML = foods.map(foodCardHtml).join('');
}

/* ---------------------------------------------------------
   9. REVEAL ON SCROLL (basic init, refined in animation.js)
   --------------------------------------------------------- */
function initReveal() {
   const items = document.querySelectorAll('.reveal');
   const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
         }
      });
   }, { threshold: 0.12 });
   items.forEach(el => io.observe(el));
}

/* ---------------------------------------------------------
   10. INIT ON EVERY PAGE
   --------------------------------------------------------- */
function highlightActiveNav() {
   const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
   document.querySelectorAll('.main-nav a[data-nav]').forEach(a => {
      a.classList.toggle('active', a.dataset.nav === page || (page === '' && a.dataset.nav === 'index'));
   });
}

function initHomePage() {
   const catWrap = document.getElementById('category-scroll');
   if (catWrap) {
      catWrap.innerHTML = CATEGORIES.map(c => `
      <a href="menu.html?category=${c.id}" class="category-item reveal">
        <div class="cat-icon">${c.icon}</div>
        <span>${c.name}</span>
      </a>`).join('');
   }

   const featuredGrid = document.getElementById('featured-grid');
   if (featuredGrid) renderFoodGrid(featuredGrid, FOODS.slice(0, 12));

   const restWrap = document.getElementById('restaurants-grid');
   if (restWrap) {
      restWrap.innerHTML = RESTAURANTS.map(r => `
      <a href="restaurant.html#${r.id}" class="restaurant-card reveal">
        <div class="restaurant-card__media">
          <img src="${r.image}" alt="${r.name}">
          <span class="restaurant-card__status ${r.status === 'closed' ? 'closed' : ''}">${r.status === 'closed' ? 'Đã đóng cửa' : 'Đang mở cửa'}</span>
          <div class="restaurant-card__logo">${r.name[0]}</div>
        </div>
        <div class="restaurant-card__body">
          <h4>${r.name}</h4>
          <div class="tags-row"><span>${r.cuisine}</span></div>
          <div class="restaurant-card__foot">
            <span>${starsHtml(r.rating, 13)} ${r.rating}</span>
            <span>⏱ ${r.time}</span>
          </div>
        </div>
      </a>`).join('');
   }
}

document.addEventListener('DOMContentLoaded', () => {
   initScrollFx();
   updateCartBadge();
   highlightActiveNav();
   initHomePage();
   initReveal();
});
