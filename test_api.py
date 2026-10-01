import urllib.request
import json

def test_endpoint(url, name, method="GET"):
    try:
        req = urllib.request.Request(url, method=method)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            print(f"[PASS] {name}: {data.get('status') or data.get('success')}")
            if 'count' in data:
                print(f"       Total records: {data['count']}")
            if 'data' in data and isinstance(data['data'], dict):
                print(f"       Stats: total={data['data'].get('total_analyses')}, healthy={data['data'].get('healthy_count')}, diseased={data['data'].get('diseased_count')}")
            return data
    except Exception as e:
        print(f"[FAIL] {name}: {e}")
        return None

if __name__ == "__main__":
    print("--- Testing API Endpoints ---")
    test_endpoint('http://127.0.0.1:8000/api/health', 'Health Check')
    test_endpoint('http://127.0.0.1:8000/api/diseases', 'Diseases Catalog')
    test_endpoint('http://127.0.0.1:8000/api/diseases?plant=Tomato', 'Filter Diseases (Tomato)')
    test_endpoint('http://127.0.0.1:8000/api/statistics', 'Dashboard Statistics')
    hist = test_endpoint('http://127.0.0.1:8000/api/history', 'History Records')

    if hist and hist.get('data'):
        latest_id = hist['data'][0]['id']
        test_endpoint(f'http://127.0.0.1:8000/api/history/{latest_id}', f'Delete Record #{latest_id}', method="DELETE")
        # Verify count decreased
        updated_hist = test_endpoint('http://127.0.0.1:8000/api/history', 'History Records (After Delete)')
        print(f"Verification: Record #{latest_id} was deleted. Records left: {updated_hist['count']}")
