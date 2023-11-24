package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.ChangeOwnPasswordRequest;
import com.korepetytio.Korepetytio.dto.EditOwnAccountDetailsRequest;
import com.korepetytio.Korepetytio.dto.EditOwnEmailRequest;
import com.korepetytio.Korepetytio.dto.ShowAccountResponse;

import java.util.List;

public interface AccountService {
    List<ShowAccountResponse> getAllAccounts();
    List<ShowAccountResponse> getAllTeachers();
    List<ShowAccountResponse> getAllStudents();
    void addAdminRole(Long id);
    void removeAdminRole(Long id);
    ShowAccountResponse retrieveCurrentUserDetails();
    ShowAccountResponse retrieveOtherUserDetails(Long id);
    void changeOwnPassword(ChangeOwnPasswordRequest changeOwnPasswordRequest);
    void editOwnAccountDetails(EditOwnAccountDetailsRequest editOwnAccountDetailsRequest);
    void editOwnEmail(EditOwnEmailRequest editOwnEmailRequest);
}
