import Moment from 'moment';

const url = 'https://sep-backend-inventory.herokuapp.com';

export async function getCheckAvailability(){
    //const response = await fetch(`http://localhost:5000/checkAvaiability`);
    const response = await fetch(`${url}/checkAvaiability`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const details = [];
    for(const key in data){
        const newObj = {
            keyid:key,
            ...data[key],
        };
        details.push(newObj);
    }
    return details;
}

export async function getBorrowingHistory(){
    const response = await fetch(`${url}/borrow`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not fetch data');
    }
    const details = [];
    const months = ['JAN','FEB','March','April','May','June','July','Aug','Sep','Oct','Nov','Des'];
    for(const key in data){
        const newObj = {
            keyid:key,
            date:{
                month:months[parseInt(Moment(data[key]['purchesedDate']).format('MM'),10)-1],
                day: Moment(data[key]['purchesedDate']).format('DD'),
            },
            details:{
                category: data[key]['Category.categoryName'],
                model: data[key]['Model.modelName'],
                storeCode: data[key]['id'],
                labName: data[key]['Lab.labName']
            }
        };
        details.push(newObj);
    }
    return details;
}

export async function getCategories(detail){
    const response = await fetch(`${url}/category`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const categoryList = [''];
    for(const key in data){
        const category = data[key]['Category.categoryName'];
        categoryList.push(category);
    }
    return categoryList;
}


export async function getModel(detail){
    const response = await fetch(`${url}/model/${detail.enterCategory}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const modelList = [''];
    //console.log(data);
    for(const key in data){
        const model = data[key]['Model.modelName'];
        modelList.push(model);
    }
    return modelList;
}

export async function getLaboratory(detail){
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    const response = await fetch(`${url}/lab/${detail.category}/${detail.model}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const labList = [''];
    for(const key in data){
        const lab = data[key]['Lab.labName'];
        labList.push(lab);
    }
    return labList;
}

export async function getStoreCode(detail){
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    const response = await fetch(`${url}/storeCode/${detail.category}/${detail.model}/${detail.lab}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const storeCodeList = [''];
    for(const key in data){
        const sCode = data[key]['id'];
        storeCodeList.push(sCode);
    }
    return storeCodeList;
}

export async function getAvailableItems(category){
    const response = await fetch(`${url}/ava`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    
    return data;
}

export async function getLecturers(detail){
    const response = await fetch(`${url}/lecturer/${detail.labId}`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    console.log(data);
    const lecturerList = [[''],['']];
    for(const key in data){
        const lec = data[key]['firstName'];
        const id = data[key]['id'];
        lecturerList[0].push(lec);
        lecturerList[1].push(id);
    }
    return lecturerList;
}

export async function sendStudentNormalBorrowingRequest(detail){
    const response = await fetch(`${url}/student/sendNormalRequest`,{
        method:'POST',
        body: JSON.stringify({studentId:detail.studentId,lecId:detail.lecId,equipmentId:detail.equipmentId,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function sendLecturerNormalBorrowingRequest(detail){
    const response = await fetch(`${url}/lecturer/sendNormalRequest`,{
        method:'POST',
        body: JSON.stringify({lecId:detail.lecId,equipmentId:detail.equipmentId,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function sendStudentTemporyBorrowingRequest(detail){
    const response = await fetch(`${url}/student/sendTemporyRequest`,{
        method:'POST',
        body: JSON.stringify({studentId:detail.studentId,equipmentId:detail.equipmentId,reason:detail.reason,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function sendLecturerTemporyBorrowingRequest(detail){
    const response = await fetch(`${url}/lecturer/sendTemporyRequest`,{
        method:'POST',
        body: JSON.stringify({lecId:detail.lecId,equipmentId:detail.equipmentId,reason:detail.reason,requestDate:detail.requestDate,returnDate:detail.returnDate}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}



// export async function sendCategory(categoryData){
//     const response = await fetch(`http://localhost:5000/models`,{
//         method:'POST',
//         body: JSON.stringify({user:categoryData}),
//         headers:{
//             'Content-Type': 'application/json'
//         },
//     });
//     const data = await response.json();
//     if(!response.ok){
//         throw new Error(data.message||'Could not fetch');
//     }
//     return data;
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getPendingRequests(){
    const response = await fetch(`${url}/pending`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const pendingList = [];
    for(const key in data){
        const newObj = {
            keyid: key,
            storeCode: data[key]['equipmentId'],
            requestDate: data[key]['requestDate'],
            returnDate: data[key]['returnDate'],
            studentId: data[key]['RequestBorrowing.studentId'],
            requestId: data[key]['id'],
        }
        pendingList.push(newObj);
    }
    return pendingList;
}

export async function getPendingDetails(id){
    const response = await fetch(`${url}/requestDetail/${id}`);
    const data = await response.json();

    console.log(response);

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch');
    }
    const pendingList = [];
    for(const key in data){
        const newObj = {
            keyid: key,
            storeCode: data[key]['id'],
            requestDate: data[key]['Requests.requestDate'],
            returnDate: data[key]['Requests.returnDate'],
            studentId: data[key]['Requests.RequestBorrowing.studentId'],
            reason: data[key]['Requests.reason'],
            category: data[key]['Category.categoryName'],
            model: data[key]['Model.modelName'],
            labName: data[key]['Lab.labName'],
        }
        pendingList.push(newObj);
    }
    return pendingList;
}

export async function approvePending(id){
    const response = await fetch(`${url}/approve/${id}`,{
        method:'POST',
        //body: JSON.stringify({user:id}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}

export async function rejectPending(id){
    const response = await fetch(`${url}/reject/${id}`,{
        method:'POST',
        //body: JSON.stringify({user:id}),
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message||'Could not fetch');
    }
    return data;
}



