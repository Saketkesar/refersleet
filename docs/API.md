# RefX Public API Documentation

RefX provides a free, unauthenticated REST API for developers building WhatsApp bots, Telegram channels, browser extensions, and deal aggregator apps.

## Base URL
```
https://api.refx.in/v1
```

## Quick Examples

### cURL
```bash
curl -s https://api.refx.in/v1/referrals?category=finance | jq .
```

### JavaScript / TypeScript
```typescript
const response = await fetch('https://api.refx.in/v1/referrals?sort=trending');
const data = await response.json();
console.log(data);
```

### Python
```python
import requests

res = requests.get('https://api.refx.in/v1/referrals', params={'category': 'technology'})
referrals = res.json()
for ref in referrals:
    print(ref['name'], ref['reward']['description'])
```

## Rate Limits
- Unauthenticated requests: `100 requests / hour / IP`
- Authenticated developer key: `10,000 requests / hour`
