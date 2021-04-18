package edu.brown.cs.everybody;

import edu.brown.cs.everybody.utils.Encryption;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Tests encryption.
 */
public class EncryptionTest {

  private static String ENCRYPTION_KEY = "32TAsARETHEBEST";

  /**
   * Empty constructor.
   */
  public EncryptionTest() {
  }

    @Test
    public void testEncryption() throws Exception {
      String password = "12345";
      String encrypted = Encryption.encrypt(password, ENCRYPTION_KEY);
      String encrypted2 = Encryption.encrypt(password, ENCRYPTION_KEY);
      assertEquals(encrypted, encrypted2);

      password = "hello122";
      encrypted = Encryption.encrypt(password, ENCRYPTION_KEY);
      encrypted2 = Encryption.encrypt(password, ENCRYPTION_KEY);
      assertEquals(encrypted, encrypted2);

      password = "1";
      encrypted = Encryption.encrypt(password, ENCRYPTION_KEY);
      encrypted2 = Encryption.encrypt(password, ENCRYPTION_KEY);
      assertEquals(encrypted, encrypted2);

      password = "!.";
      encrypted = Encryption.encrypt(password, ENCRYPTION_KEY);
      encrypted2 = Encryption.encrypt(password, ENCRYPTION_KEY);
      assertEquals(encrypted, encrypted2);

      password = "aw;oegh;aowf;oajwo;efjwa;ioejfioajw;efjoiajf";
      encrypted = Encryption.encrypt(password, ENCRYPTION_KEY);
      encrypted2 = Encryption.encrypt(password, ENCRYPTION_KEY);
      assertEquals(encrypted, encrypted2);

      password = " ";
      encrypted = Encryption.encrypt(password, ENCRYPTION_KEY);
      encrypted2 = Encryption.encrypt(password, ENCRYPTION_KEY);
      assertEquals(encrypted, encrypted2);
    }

}
