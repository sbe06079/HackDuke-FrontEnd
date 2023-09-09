export const askChatGPT = async (prompt: string) => {
    try {
        const response = await fetch("/api/chatGPT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: prompt })
        }).then(v => v.json());

        console.log(response);
        if (response) {
            return response.choices[0].message.content; // Access the "completion" field from the response
        } else {
            console.error(response);
            return "Something went wrong!";
        }
    } catch (err) {
        console.error(err);
        return "Something went wrong!";
    }
};

export const translateText = async (text: string, code: string) => {
    try {
        const response = await fetch("/api/deepl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                translate: text,
                target_lang: code
            })
        }).then(v => v.json());

        console.log(response);
        if (response) {
            return response;
        } else {
            console.error(response);
            return "API Error!";
        }
    } catch (err) {
        console.error(err);
        return "API Error!";
    }
};

export const translatePage = async (text: string) => {
    try {
        const response = await fetch("/api/deepl-page", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                translate: text,
                target_lang: "FR"
            })
        }).then(v => v.json());

        console.log(response);
        if (response) {
            return response;
        } else {
            console.error(response);
            return "API Error!";
        }
    } catch (err) {
        console.error(err);
        return "API Error!";
    }
};