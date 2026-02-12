
export interface ContractData {
  brandName: string;
  customerName: string;
  limitAmount: string;
  contractDate: string;
  contractId: string;
  balanceImage: string | null;
}

// ==========================================================================
// FILE CẤU HÌNH TRUNG TÂM - CHỈNH SỬA TOÀN BỘ WEB TẠI ĐÂY
// ==========================================================================

export const APP_CONFIG = {
  // 1. THÔNG TIN CƠ BẢN (Xuất hiện khi vừa load trang)
  defaultData: {
    brandName: "Con Cưng Mẹ & Bé",
    customerName: "Nguyen Thi Thu",
    limitAmount: "10.000.000.000", // Hạn mức mặc định
    contractDate: new Date().toLocaleDateString('vi-VN'), // Ngày hiện tại
    contractId: `CC-VIP-${Math.floor(Math.random() * 900000) + 100000}`,
    balanceImage: null // Hình ảnh số dư mặc định (null là chưa có)
  },

  // 2. THÔNG TIN PHÁP LÝ THƯƠNG HIỆU (Chỉnh sửa mã số thuế ở đây)
  brandInfo: {
    taxId: "0312345678", // <--- THAY ĐỔI MÃ SỐ THUẾ TẠI ĐÂY
    address: "Tòa nhà Con Cưng, Quận 1, TP. HCM",
    companyIdLabel: "Mã số thuế:0313450007 ",
    addressLabel: "Trụ sở:Số 66 Nguyễn Du, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh"
  },

  // 3. HÌNH ẢNH & NHẬN DIỆN (Thay link ảnh tại đây)
  assets: {
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KhKFOMIMQzaLHrsXvrf0VKYSxmzYJr_ojA&s",
    stampUrl: "https://res.cloudinary.com/dutj4khkq/image/upload/v1770528397/photo_2026-02-08_11-55-21_olbqeb.jpg",
    subTitle: "Hệ Thống Mẹ & Bé Cao Cấp - NÂNG HẠN MỨC KIM CƯƠNG",
    programName: "Chương trình Khách hàng kim cương",
    watermarkOpacity: "0.03" // Độ mờ của hình mờ mẹ và bé (0 đến 1)
  },

  // 4. TIÊU ĐỀ CÁC MỤC CHÍNH
  headings: {
    mainTitle: "Hợp Đồng Nâng Cấp Hạn Mức",
    partyA: "Bên A: Thương Hiệu",
    partyB: "Bên B: Khách Hàng",
    representativeA: "Đại diện Bên A",
    representativeB: "Bên B (Khách hàng)",
    sealSignedText: "Đã ký và đóng dấu",
    verifiedStamp: "VERIFIED BY BANK",
    awaitingStamp: "AWAITING PROOF"
  },

  // 5. NỘI DUNG 5 ĐIỀU KHOẢN HỢP ĐỒNG
  sections: {
    section1: {
      title: "Mục đích hợp đồng",
      content: "Văn bản này xác lập các điều khoản và điều kiện cho việc nâng cấp hạn mức tín dụng và giao dịch ưu tiên dành riêng cho Khách hàng Kim Cương. Mục đích nhằm tối ưu hóa trải nghiệm mua sắm và cung cấp các giải pháp tài chính linh hoạt nhất cho sự phát triển của mẹ và bé."
    },
    section2: {
      title: "Điều kiện tham gia",
      preContent: "Để được xem xét nâng hạng mức giao dịch lên ngưỡng từ 5.000.000.000 đến",
      postContent: "VNĐ, việc ký kết và tuân thủ các điều khoản trong hợp đồng này là bắt buộc.",
      items: [
        "Khách hàng thuộc danh sách đặc cách ưu tiên của hệ thống.",
        "Chứng thực số dư hiện tại đang có bằng hình ảnh chụp tài khoản số dư ngân hàng khi ký kết, đảm bảo đủ để tham gia mở hạn mức. Số tiền : 860.000.000VND"
      ]
    },
    section3: {
      title: "Quyền lợi đặc quyền",
      benefits: [
        { title: "Bảo mật ưu tiên", desc: "Giao dịch được mã hóa và xác thực bởi lớp bảo mật riêng tư cấp cao." },
        { title: "Ưu đãi độc quyền", desc: "Tích lũy x5 điểm thưởng và quyền tham gia các sự kiện private." },
        { title: "Nâng cấp không giới hạn", desc: "Khả năng mở rộng hạn mức lên đến 10 tỷ VNĐ." }
      ]
    },
    section4: {
      title: "Nghĩa vụ khách hàng",
      content: "Bên B cam kết cung cấp đầy đủ và trung thực các hồ sơ liên quan khi có yêu cầu. Tuân thủ tuyệt đối các chính sách và sử dụng dịch vụ của hệ thống. Không sử dụng hạn mức cho các mục đích vi phạm pháp luật hoặc ảnh hưởng đến uy tín thương hiệu."
    },
    section5: {
      title: "Hiệu lực & Cam kết",
      content: "Hợp đồng có hiệu lực kể từ thời điểm ký kết cho đến khi có văn bản thay thế hoặc chấm dứt theo thỏa thuận. Các bên cam kết đã đọc, hiểu và đồng ý hoàn toàn với các điều khoản nêu trên. Mọi tranh chấp phát sinh sẽ được giải quyết thông qua thương lượng, nếu không thành sẽ theo quy định của pháp luật nước CHXHCN Việt Nam."
    }
  },

  // 6. CÁC THÔNG BÁO & NHÃN (Labels)
  labels: {
    verificationTitle: "Chứng thực số dư",
    verificationSub: "Ảnh chụp tài khoản số dư ngân hàng đã được hệ thống ghi nhận:",
    uploadBtn: "Tải ảnh số dư tài khoản",
    missingImagePrint: "[CHƯA CUNG CẤP HÌNH ẢNH CHỨNG THỰC]",
    signHereBtn: "KÝ TÊN TẠI ĐÂY",
    printBtn: "XUẤT FILE PDF",
    resetBtn: "LÀM MỚI",
    footerNote: "Chăm sóc từ trái tim."
  },

  // 7. MÀN HÌNH THÀNH CÔNG (Sau khi ký)
  success: {
    title: "CHÚC MỪNG NÂNG CẤP THÀNH CÔNG!",
    greeting: "Kính thưa quý khách",
    message: "Yêu cầu nâng cấp hạn mức của quý khách đã được phê duyệt chính thức. Hạn mức mới của quý khách hiện là:",
    buttonLabel: "TIẾP TỤC TRẢI NGHIỆM"
  }
};
