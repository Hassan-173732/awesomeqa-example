import hashlib

class Helper:
    @staticmethod
    def generate_unique_id(input_string):
        # Create a hash using SHA-256
        hashed = hashlib.sha256(input_string.encode()).hexdigest()

        # Take the first 5 characters and convert them to alphanumeric
        unique_id = 'XT-' + ''.join(c for c in hashed[:5] if c.isalnum())

        return unique_id