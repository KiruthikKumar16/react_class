class BankAccount {
    private int balance = 0;

    // Fixed version — synchronized on the block, not the whole method,
    // to demonstrate the bonus lab task
    public void deposit(int amount) {
        synchronized (this) {
            balance += amount;
        }
    }

    public void withdraw(int amount) {
        synchronized (this) {
            balance -= amount;
        }
    }

    public synchronized int getBalance() {
        return balance;
    }
}

public class BankAccountLab {
    public static void main(String[] args) throws InterruptedException {
        BankAccount account = new BankAccount();

        Runnable depositTask = () -> {
            for (int i = 0; i < 100000; i++) {
                account.deposit(1);
            }
        };

        Runnable withdrawTask = () -> {
            for (int i = 0; i < 100000; i++) {
                account.withdraw(1);
            }
        };

        Thread t1 = new Thread(depositTask);
        Thread t2 = new Thread(depositTask);
        Thread t3 = new Thread(withdrawTask);
        Thread t4 = new Thread(withdrawTask);

        t1.start();
        t2.start();
        t3.start();
        t4.start();
        t1.join();
        t2.join();
        t3.join();
        t4.join();

        // Two threads deposit 100000 each, two threads withdraw 100000 each
        // Net effect should be exactly 0
        System.out.println("Expected balance: 0, Actual: " + account.getBalance());
    }
}
