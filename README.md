# heroku-scale-dyno

Scale a heroku dyno

## Sample usage

### Scale a dyno to 1

```yml
on:
  schedule:    
    - cron: '0 19 * * *'

jobs:
  scale_dyno_to_1:
    runs-on: ubuntu-latest
    name: scale dyno to 1
    steps:
      - name: scale dyno
        id: scale
        uses: deer42/heroku-scale-dyno@v1.0
        with:
          app_name: ${{ secrets.HEROKU_APP_NAME }}          
          email: ${{ secrets.EMAIL }}          
          api_key: ${{ secrets.HEROKU_API_KEY }}          
          process_type: worker
          new_scale: 1      
```

### Scale a dyno to 1 and after some time back to 0 to save free dyno hours

```yml
on:
  schedule:    
    - cron: '0 19 * * *'

jobs:
  scale_dyno_to_1_and_back_to_0:
    runs-on: ubuntu-latest
    name: scale dyno to 1
    steps:
      - name: scale dyno
        id: scale
        uses: deer42/heroku-scale-dyno@v1.0
        with:
          app_name: ${{ secrets.HEROKU_APP_NAME }}          
          email: ${{ secrets.EMAIL }}          
          api_key: ${{ secrets.HEROKU_API_KEY }}          
          process_type: worker
          new_scale: 1
      - name: Sleep for 2 minutes
        run: sleep 120s
        shell: bash
      - name: scale dyno back to 0
        id: scale
        uses: deer42/heroku-scale-dyno@v1.0
        with:
          app_name: ${{ secrets.HEROKU_APP_NAME }}          
          email: ${{ secrets.EMAIL }}          
          api_key: ${{ secrets.HEROKU_API_KEY }}          
          process_type: worker
          new_scale: 0
```
