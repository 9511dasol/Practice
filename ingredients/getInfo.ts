import axios from "axios";
import { URLs } from "./url";
import { DetailedProject, fetchData } from "./interface";
import { Project } from './interface';



export async function getDetailedInfo(id: number): Promise<DetailedProject> {
    try {
        // 백엔드 API 호출
        const response = await axios.get(`${URLs["local"]}/factory-audits/${id}`);

        return response.data as DetailedProject;
    } catch (err) {
        console.error(`ID ${id} 데이터 로드 실패, 로컬 템플릿 사용:`, err);

        // 인덱스가 아닌 'id' 필드값으로 데이터를 찾는 방식이 안전합니다.
        const fallbackData = mockProjects.find(p => p.id === id) || mockProjects[0];

        if (!fallbackData) {
            // 가짜 데이터조차 없을 경우에 대한 방어 로직
            throw new Error("Project not found in both API and Mock data");
        }

        return fallbackData as DetailedProject;
    }
}

export async function getInfos(): Promise<fetchData> {
    // 인위적인 로딩 지연 (UI 확인용)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await axios.get(`${URLs["local"]}/factory-audits`);
        // const response = await axios.get(`backapop/factory-audits`);
        // const response = await axios.get(URLs["local"] + "http://back:8000/api/factory-audits");

        const data: fetchData = response.data; // 백엔드로부터 데이터 불러오기

        return data;
    } catch (err) {
        console.error("데이터 로드 실패, 로컬 템플릿 사용:", err);
        return tempData as fetchData;
    }
}

export async function getInfo(id: string) {
    // await new Promise((resolve) => setTimeout(resolve, 1000)); //Loding
    // const response = await fetch(URL);
    // const json = await response.json();
    // return json
    // return fetch(URL).then(response => response.json());
    return axios(`${URLs["local"]}/posts/` + id).then((response) => response.data);
}

export async function getInfoAll() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); //Loding
    // const response = await fetch(URL);
    // const json = await response.json();
    // return json
    // return fetch(URL).then(response => response.json());
    return axios(URLs["local"] + "/posts").then((response) => response.data);
}



export const getAuth = async (id: string, pw: string) => {
    return axios.post(`${URLs.local}/posts/auth`, { id, pw })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            // alert(`error: Comfirm your ID OR PW`);
            // alert(`${URLs.local}/auth`)
            return false;
        })

}

export const signup = async (id: string, pw: string) => {
    console.log(id, pw)
    if (id.length <= 4 && pw.length <= 5) return false;
    return axios.post(`${URLs.local}/signup`, { id, pw })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            // alert(`error: Comfirm your ID OR PW`);
            console.error(`${URLs.local}/signup`)
            return false;
        });

}

export const uploadResult = async (file: File | null) => {
    if (!file) return null;
    // await new Promise((resolve) => setTimeout(resolve, 2000)); //Loding

    // 1. 파일을 FormData에 담기 (백엔드의 file: UploadFile 매개변수 대응)
    const formData = new FormData();
    formData.append('file', file);

    // 2. Query String 구성 (백엔드의 sheetName: str 대응)
    const sheetName = "Audit Status";
    const url = `${URLs["local"]}/factory-audits/imports/commit-with-file?sheetName=${encodeURIComponent(sheetName)}`;

    try {
        const res = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        // 백엔드 성공 시 로그: "POST ... 200"
        return res.data;
    } catch (err) {
        console.error("Upload Error:", err);
        throw err;
    }
};


const tempData = {
    items: [
        {
            id: 1,
            auditType: "BW",
            buyer: "Better Work",
            co: "PT. Bintang Baru Sukses",
            dueBucket: "Green",
            dueDays: 365,
            dueSoon: false,
            expiryDate: "2027-01-13",
            factoryName: "PT. Bintang Baru Sukses Factory",
            fctId: "FCT001",
            latestAuditDate: "2026-01-13"
        },
        {
            id: 2,
            auditType: "I",
            buyer: "International Buyer",
            co: "Better Work Factory A",
            dueBucket: "Yellow",
            dueDays: 180,
            dueSoon: true,
            expiryDate: "2026-08-01",
            factoryName: "Better Work Factory A",
            fctId: "FCT002",
            latestAuditDate: "2026-02-01"
        },
        {
            id: 3,
            auditType: "SC",
            buyer: "Supply Chain Co.",
            co: "Global Manufacturing",
            dueBucket: "Red",
            dueDays: 30,
            dueSoon: true,
            expiryDate: "2026-03-30",
            factoryName: "Global Manufacturing Plant",
            fctId: "FCT003",
            latestAuditDate: "2025-03-01"
        }
    ],
    totalCount: 150,
    totalPages: 15
}

const mockProjects: DetailedProject[] = [
    {
        id: 1,
        buyer: "Better Work",
        co: "PT. Bintang Baru Sukses",
        factoryName: "PT. Bintang Baru Sukses Factory",
        fctId: "FCT001",
        tCode: "T-9921",
        auditType: "BW",
        latestAuditor: "John Doe",
        latestAuditDate: "2025-01-13",
        expiryDate: "2026-01-13", // 이미 지난 날짜 (Expired)
        statusText: "Action Required",
        remarks: "Follow-up audit needed for safety protocols.",
        dueBucket: "OVER",
        dueDays: -56, // 오늘(2026-03-10) 기준 계산값 예시
        dueSoon: false,
        factoryKey: "key_001_bbs",
        rowSeq: 1,
        updatedAt: "2026-03-05T12:00:00+00:00"
    },
    {
        id: 2,
        buyer: "Nike",
        co: "Vina Fashion Co., Ltd",
        factoryName: "Vina Fashion Central Hub",
        fctId: "FCT-VN-042",
        tCode: null,
        auditType: "Social",
        latestAuditor: "Sarah Connor",
        latestAuditDate: "2025-04-20",
        expiryDate: "2026-04-20", // 약 한 달 남음 (Soon)
        statusText: "In Progress",
        remarks: null,
        dueBucket: "SOON",
        dueDays: 41,
        dueSoon: true,
        factoryKey: "key_042_vfc",
        rowSeq: 2,
        updatedAt: "2026-03-08T09:30:00+00:00"
    },
    {
        id: 3,
        buyer: "Adidas",
        co: "Han Sae Vietnam",
        factoryName: "Han Sae Factory #3",
        fctId: "FCT-HS-109",
        tCode: "T-1005",
        auditType: "Environmental",
        latestAuditor: null,
        latestAuditDate: "2025-09-15",
        expiryDate: "2026-09-15", // 넉넉히 남음 (Normal)
        statusText: "Compliant",
        remarks: "All green indicators.",
        dueBucket: "NORMAL",
        dueDays: 189,
        dueSoon: false,
        factoryKey: "key_109_hsv",
        rowSeq: 3,
        updatedAt: "2026-03-10T15:20:00+00:00"
    }
];