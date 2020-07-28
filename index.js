const result = document.getElementById('result');

let check_val = false

function process(){
    console.log('hello')
    const drive_link = document.getElementById('drive-link').value;
    const file_name = document.getElementById('file-name').value;

    
    // const dl =  'https://drive.google.com/file/d/0B23nSyku-_uic3RhcnRlcl9maWxl/view?usp=sharing';
    let url = new URL(drive_link);
    url = url.pathname.split('/');
    const file_id = url[3];
    console.log(file_id)
   
    console.log(drive_link, file_name, check_val);

    let res = `wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=${file_id}' -O ${file_name}`
    if(check_val){
        res = `wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=${file_id}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\\1\\n/p')&id=${file_id}" -O ${file_name} && rm -rf /tmp/cookies.txt`;
    }

    result.innerText = res;
}

function setCheck(){
    check_val = !check_val;
}

function copyToClipboard() {
    const data = result.innerText;
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = data;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }