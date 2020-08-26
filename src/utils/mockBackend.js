export function configureFakeBackend() {
    let users = [{ id: 1, username: 'test', password: 'testing', firstName: 'Test', lastName: 'User' }];
    let employees = [
        {name:'test',code:'A001',project:'project1',technology:'React'},
        {name:'test1',code:'A002',project:'project1',technology:'Readct,Python'},
        {name:'test2',code:'A003',project:'project2',technology:'Java'},
        {name:'test3',code:'A004',project:'project3',technology:'Java'},
        {name:'test4',code:'A005',project:'project4',technology:'C#'},
        {name:'test5',code:'A006',project:'project5',technology:'Angular'},
        {name:'test6',code:'A007',project:'project2',technology:'Node'},
    ];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === 'fake-jwt-token';

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/auth') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.username && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    });
                }
                else if(url.endsWith('/employees') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(employees);
                }
                else if(url.endsWith('/add') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    const params = JSON.parse(opts.body);
                    employees = employees.concat(params);
                    return ok('Success');
                }
                else if(url.endsWith('/delete') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    const params = JSON.parse(opts.body);
                    employees = employees.filter(el => el.code !== params.code);
                    return ok('Success');
                }
                else if(url.endsWith('/edit') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    const params = JSON.parse(opts.body);
                    const idx = employees.findIndex(el => el.code !== params.code);
                    let arr = [...employees];
                    arr[idx] = {...arr[idx],name:params.name}
                    employees = [...arr];
                    return ok('Success');
                }

                realFetch(url, opts).then(response => resolve(response));

                function ok(body) {
                    resolve({ ok: true, text:resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text:resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}