const saveHistory = (data: any) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/api/chat-gpt/history/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export { saveHistory };
