// create 10 sample answers from bot in Vietnamese

export const sampleAnswers = [
  'Chat GPT là ứng dụng AI được phát triển từ mô hình GPT-3.5 của công ty khởi nghiệp công ty OpenAI, được đào tạo để đưa ra câu trả lời giống một cuộc trò chuyện với người thật. Dù hoạt động miễn phí, người sử dụng cần có tài khoản trên nền tảng của OpenAI. Dịch vụ chưa hỗ trợ mở tài khoản ở Việt Nam. Người dùng trong nước muốn trải nghiệm phải sử dụng mạng riêng ảo (VPN), thuê số điện thoại nước ngoài với giá khoảng vài USD, dùng thẻ thanh toán quốc tế để đăng ký, hoặc mua tài khoản từ người khác.',
  'NuocGPT is looking for a tech partner to build the conversational UI that answers questions about water and climate in Vietnam, with a specific focus on salinity intrusion. To retrieve information and answer questions, NuocGPT will leverage Large Language Models.',
  'User authenticates (“logging in”) and interfaces with our system through a client-facing UI. There should be a chat component that allows the user to type in questions (called “prompts") related to water and climate (in Vietnamese or English). The user prompt is sent to a backend server for processing; our backend server can scan the user prompt for malicious or unsupported prompts. The backend server sends the user prompt to a QA retrieval service and k most relevant QA pairs are retrieved and added to the prompt. The augmented prompt is sent over the LLMs to generate a response. The generated response is sent to a critique model to evaluate whether it conforms with our policy guidelines; the final response is returned to the user. The user can choose to log the prompt and response together with the feedback to a log database; these collected data can be used to train and finetune and evaluate our future models.',
];

export const getSampleAnswers = () => {
  const index = Math.floor(Math.random() * sampleAnswers.length);
  return sampleAnswers[index];
};
